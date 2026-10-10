package main

import (
	"encoding/json"
	"os"
	"path"
	"path/filepath"
	"testing"
)

func TestSetDuration(t *testing.T) {
	app := NewApp()

	err := app.SetDuration(45)

	if err != nil {
		t.Fatal(err)
	}

	if got := app.GetDuration(); got != 45 {
		t.Fatalf("GetDuration() = %d, want 45", got)
	}
}

func TestSetDurationRejectsInvalidValues(t *testing.T) {
	settingsPath := filepath.Join(t.TempDir(), "settings.json")
	app := newAppWithConfigPath(settingsPath)

	if err := app.SetDuration(0); err == nil {
		t.Fatalf("SetDuration(0) shouldn't accepted 0")
	}

	if got := app.GetDuration(); got != 25 {
		t.Fatalf("duration must not be updated")
	}

	if err := app.SetDuration(-1); err == nil {
		t.Fatalf("SetDuration(-1) shouldn't accepted -ve number")
	}

	if got := app.GetDuration(); got != 25 {
		t.Fatalf("duration must not be updated")
	}

	if err := app.SetDuration(181); err == nil {
		t.Fatalf("SetDuration(181) shouldn't accepted numbers greater than 180")
	}

	if got := app.GetDuration(); got != 25 {
		t.Fatalf("duration must not be updated")
	}

}

func TestJson(t *testing.T) {
	settings := Settings{
		Duration: 25,
	}

	data, err := json.Marshal(settings)

	if err != nil {
		t.Fatal(err)
	}

	dirPath := t.TempDir()
	fileName := "settings.json"

	err = os.WriteFile(path.Join(dirPath, fileName), data, 0600)

	if err != nil {
		t.Fatal(err)
	}

	content, err := os.ReadFile(path.Join(dirPath, fileName))

	if err != nil {
		t.Fatal(err)
	}

	var newSetting Settings

	if err = json.Unmarshal(content, &newSetting); err != nil {
		t.Fatal(err)
	}

	if newSetting.Duration != 25 {
		t.Fatalf("expected duration 25, got %d", newSetting.Duration)
	}
}

func TestNewApp_DefaultDuration(t *testing.T) {
	fileName := "settings.json"
	settingsPath := filepath.Join(t.TempDir(), fileName)

	app := newAppWithConfigPath(settingsPath)

	if app.settings.Duration != 25 {
		t.Fatalf("expected duration 25, got %d", app.settings.Duration)
	}
}

func TestLoadSettings_ExistingFile(t *testing.T) {
	fileName := "settings.json"
	settingsPath := filepath.Join(t.TempDir(), fileName)

	initialSettings := &Settings{
		Duration: 45,
	}

	jsonSettings, err := json.Marshal(initialSettings)
	if err != nil {
		t.Fatalf("Error while json.Marshal(), %v", err)
	}

	if err = os.WriteFile(settingsPath, jsonSettings, 0600); err != nil {
		t.Fatalf("Error while os.WriteFile(), %v", err)
	}

	app := newAppWithConfigPath(settingsPath)

	if app.settings.Duration != 45 {
		t.Fatalf("expected duration 45, got %d", app.settings.Duration)
	}
}

func TestLoadSettings_InvalidJSON(t *testing.T) {
	fileName := "settings.json"
	settingsPath := filepath.Join(t.TempDir(), fileName)

	if err := os.WriteFile(settingsPath, []byte(`{"duration":}`), 0600); err != nil {
		t.Fatalf("Error while os.WriteFile(), %v", err)
	}

	app := &App{
		settings: Settings{
			Duration: 25,
		},
		configPath: settingsPath,
	}

	if err := app.loadSettings(); err == nil {
		t.Fatalf("app.loadSettings() should return error on malformed json")
	}
}

func TestSaveSettings(t *testing.T) {
	settingsPath := filepath.Join(t.TempDir(), "settings.json")

	app := &App{
		settings: Settings{
			Duration: 45,
		},
		configPath: settingsPath,
	}

	if err := app.saveSettings(app.settings); err != nil {
		t.Fatalf("saveSettings() failed: %v", err)
	}

	data, err := os.ReadFile(settingsPath)
	if err != nil {
		t.Fatalf("failed to read settings file: %v", err)
	}

	var saved Settings
	if err := json.Unmarshal(data, &saved); err != nil {
		t.Fatalf("failed to decode saved settings: %v", err)
	}

	if saved.Duration != 45 {
		t.Fatalf("expected duration 45, got %d", saved.Duration)
	}
}

func TestSetDuration_PersistsValue(t *testing.T) {
	settingsPath := filepath.Join(t.TempDir(), "settings.json")
	app := newAppWithConfigPath(settingsPath)

	if err := app.SetDuration(45); err != nil {
		t.Fatal("Error on app.SetDuration(45): ", err)
	}

	newApp := newAppWithConfigPath(settingsPath)

	if newApp.settings.Duration != 45 {
		t.Fatal("newApp.settings.Duration must be 45")
	}
}

func TestSetDuration_SaveFailureKeepsCurrentValue(t *testing.T) {
	settingsPath := filepath.Join(t.TempDir(), "missing", "settings.json")
	app := newAppWithConfigPath(settingsPath)

	err := app.SetDuration(45)
	if err == nil {
		t.Fatal("expected an error when saving settings fails")
	}

	if app.settings.Duration != 25 {
		t.Fatalf("expected duration to remain 25, got %d", app.settings.Duration)
	}
}

func TestAddDomain(t *testing.T) {
	settingsPath := filepath.Join(t.TempDir(), "settings.json")
	app := newAppWithConfigPath(settingsPath)

	domain := "https://wwww.youtube.com"

	if err := app.AddDomain(domain); err != nil {
		t.Fatal(err)
	}

	newApp := newAppWithConfigPath(settingsPath)

	if len(newApp.settings.BlockedDomains) == 0 {
		t.Fatal("BlockedDomains should contain at least on element")
	}

	if newApp.settings.BlockedDomains[0].Url != domain {
		t.Fatal("BlockedDomains should contait: ", domain)
	}

	domains := app.GetDomains()

	if len(domains) == 0 {
		t.Fatal("BlockedDomains should contain at least on element")
	}

}
