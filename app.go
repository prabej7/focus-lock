package main

import (
	"context"
	"encoding/json"
	"errors"
	"log"
	"os"
	"path/filepath"
)

const (
	AppName      = "FocusLock"
	SettingsFile = "settings.json"
)

type Domain struct {
	Url       string
	IsBlocked bool
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
	settingsCopy := a.settings

	settingsCopy.BlockedDomains = append(settingsCopy.BlockedDomains, Domain{
		Url:       domain,
		IsBlocked: true,
	})

	if err := a.saveSettings(settingsCopy); err != nil {
		return err
	}

	a.settings = settingsCopy
	return nil
}

func (a *App) GetDomains() []Domain {
	return a.settings.BlockedDomains
}
