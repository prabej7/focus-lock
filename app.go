package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"slices"
	"strings"
)

const (
	AppName      = "FocusLock"
	SettingsFile = "settings.json"
)

type Domain struct {
	Url       string `json:"url"`
	IsBlocked bool   `json:"isBlocked"`
}

type Settings struct {
	Duration       int      `json:"duration"`
	BlockedDomains []Domain `json:"blockedDomains"`
}

// App struct
type App struct {
	ctx        context.Context
	settings   Settings
	configPath string
}

// NewApp creates a new App application struct

func NewApp() *App {
	userConfigDirPath, err := os.UserConfigDir()
	if err != nil {
		log.Fatal(err)
	}

	appDir := filepath.Join(userConfigDirPath, AppName)
	if err = os.MkdirAll(appDir, 0700); err != nil {
		log.Fatal(err)
	}

	configPath := filepath.Join(appDir, SettingsFile)
	return newAppWithConfigPath(configPath)
}

func newAppWithConfigPath(configPath string) *App {
	app := &App{
		settings: Settings{
			Duration:       25,
			BlockedDomains: []Domain{},
		},
		configPath: configPath,
	}

	if err := app.loadSettings(); err != nil {
		log.Println("Error loading settings:", err)
	}

	return app
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetDuration() int {
	return a.settings.Duration
}

func (a *App) SetDuration(minutes int) error {
	if minutes < 1 || minutes > 180 {
		return errors.New("minutes must be between 1 and 180")
	}

	settingsCopy := a.settings
	settingsCopy.Duration = minutes

	if err := a.saveSettings(settingsCopy); err != nil {
		return err
	}

	a.settings = settingsCopy
	return nil
}

func (a *App) loadSettings() error {
	settingsData, err := os.ReadFile(a.configPath)

	if err != nil {
		if errors.Is(err, os.ErrNotExist) {
			return nil
		}
		return err
	}

	if err = json.Unmarshal(settingsData, &a.settings); err != nil {
		return err
	}

	return nil
}

func (a *App) saveSettings(setting Settings) error {
	data, err := json.Marshal(setting)
	if err != nil {
		return err
	}

	tempFile := a.configPath + ".tmp"

	if err := os.WriteFile(tempFile, data, 0600); err != nil {
		return err
	}

	if err := os.Rename(tempFile, a.configPath); err != nil {
		os.Remove(tempFile)
		return err
	}

	return nil
}

func (a *App) AddDomain(domain string) error {
	domain = strings.TrimSpace(domain)
	domain = strings.TrimPrefix(
		strings.TrimPrefix(domain, "https://"),
		"http://",
	)

	domain = strings.TrimSpace(domain)
	domain = strings.TrimSuffix(domain, "/")

	if domain == "" {
		return errors.New("domain cannot be empty")
	}

	if strings.ContainsAny(domain, "/?#@") {
		return errors.New("provide a hostname, not a URL or path")
	}

	host := domain
	if strings.Contains(host, ":") {
		return errors.New("ports are not allowed")
	}

	if len(host) > 253 {
		return errors.New("domain is too long")
	}

	host = strings.ToLower(host)

	if strings.HasPrefix(host, ".") ||
		strings.HasSuffix(host, ".") ||
		!strings.Contains(host, ".") {
		return errors.New("provide a valid domain name")
	}

	for _, label := range strings.Split(host, ".") {
		if label == "" || len(label) > 63 {
			return errors.New("invalid domain name")
		}

		if strings.HasPrefix(label, "-") ||
			strings.HasSuffix(label, "-") {
			return errors.New("domain labels cannot start or end with a hyphen")
		}

		for _, r := range label {
			if !((r >= 'a' && r <= 'z') ||
				(r >= '0' && r <= '9') ||
				r == '-') {
				return errors.New("domain contains invalid characters")
			}
		}
	}

	for _, existing := range a.settings.BlockedDomains {
		if strings.EqualFold(existing.Url, host) {
			return errors.New("domain already exists")
		}
	}

	settingsCopy := a.settings
	settingsCopy.BlockedDomains = append(
		settingsCopy.BlockedDomains,
		Domain{
			Url:       host,
			IsBlocked: true,
		},
	)

	if err := a.saveSettings(settingsCopy); err != nil {
		return err
	}

	a.settings = settingsCopy
	return nil
}

func (a *App) GetDomains() []Domain {
	domains := make([]Domain, len(a.settings.BlockedDomains))
	copy(domains, a.settings.BlockedDomains)
	return domains
}

func (a *App) getDomain(domain string) (int, error) {
	idx := slices.IndexFunc(a.settings.BlockedDomains, func(d Domain) bool {
		return d.Url == domain
	})

	if idx == -1 {
		return -1, fmt.Errorf("domain record not found")
	}

	return idx, nil
}

func (a *App) ToggleBlock(domain string) error {
	settingsCopy := a.settings

	idx, err := a.getDomain(domain)

	if err != nil {
		return err
	}

	domainRecord := settingsCopy.BlockedDomains[idx]

	settingsCopy.BlockedDomains[idx] = Domain{
		Url:       domainRecord.Url,
		IsBlocked: !domainRecord.IsBlocked,
	}

	if err := a.saveSettings(settingsCopy); err != nil {
		return err
	}

	a.settings = settingsCopy

	return nil
}

func (a *App) DeleteDomain(domain string) error {
	idx, err := a.getDomain(domain)

	if err != nil {
		return err
	}

	settingsCopy := a.settings

	settingsCopy.BlockedDomains = slices.Delete(settingsCopy.BlockedDomains, idx, idx+1)

	if err = a.saveSettings(settingsCopy); err != nil {
		return err
	}

	a.settings = settingsCopy

	return nil
}
