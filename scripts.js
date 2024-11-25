document.addEventListener('DOMContentLoaded', () => {
  const emailToggle = document.getElementById('email-notifications');
  const telegramToggle = document.getElementById('telegram-notifications');
  const telegramSettings = document.getElementById('telegram-settings');
  const emailConfirmation = document.getElementById('email-confirmation');
  const telegramConfirmation = document.getElementById('telegram-confirmation');
  const telegramApiKey = document.getElementById('telegram-api-key');
  const telegramChatId = document.getElementById('telegram-chat-id');
  const tutorialPlaceholderLink = document.getElementById('tutorial-placeholder');

  // Function to update Email Notification Status
  emailToggle.addEventListener('change', () => {
    if (emailToggle.checked) {
      // Simulate sending a confirmation email
      const userEmail = getUserEmail(); // Assume a function that retrieves the user's email
      emailConfirmation.textContent = `Email notifications sent to ${userEmail}.`;
      // TODO: Integrate with backend to enable email notifications
      updateNotificationSetting('email', true);
    } else {
      emailConfirmation.textContent = '';
      // TODO: Integrate with backend to disable email notifications
      updateNotificationSetting('email', false);
    }
  });

  // Function to toggle Telegram Settings Visibility
  telegramToggle.addEventListener('change', () => {
    if (telegramToggle.checked) {
      telegramSettings.classList.remove('hidden');
      // Optionally, focus the first input field
      telegramApiKey.focus();
    } else {
      telegramSettings.classList.add('hidden');
      telegramConfirmation.textContent = '';
      // TODO: Integrate with backend to disable telegram notifications
      updateNotificationSetting('telegram', false);
    }
  });

  // Function to handle Telegram Settings Input
  const handleTelegramSettings = () => {
    const apiKey = telegramApiKey.value.trim();
    const chatId = telegramChatId.value.trim();

    if (apiKey && chatId) {
      // TODO: Validate and send Telegram credentials to backend
      const isValid = validateTelegramCredentials(apiKey, chatId);
      if (isValid) {
        telegramConfirmation.textContent = 'Telegram notifications activated.';
        updateNotificationSetting('telegram', true, { apiKey, chatId });
      } else {
        telegramConfirmation.textContent = 'Invalid Telegram credentials. Please try again.';
      }
    } else {
      telegramConfirmation.textContent = 'Please enter both API Key and Chat ID.';
    }
  };

  // Event listeners for Telegram input fields
  telegramApiKey.addEventListener('blur', handleTelegramSettings);
  telegramChatId.addEventListener('blur', handleTelegramSettings);

  // Placeholder Link for Tutorial
  tutorialPlaceholderLink.addEventListener('click', (e) => {
    e.preventDefault();
    // Show a message indicating the tutorial is coming soon
    alert('The official tutorial is coming soon!');
  });

  // Placeholder Functions for Backend Integration
  function getUserEmail() {
    // Placeholder: Replace with actual logic to retrieve the user's email
    return 'YourBuhoMailAddress@domain.de';
  }

  function updateNotificationSetting(type, isEnabled, credentials = {}) {
    // Placeholder: Replace with actual API call to update notification settings
    console.log(`Updating ${type} notifications to ${isEnabled}`, credentials);
    // Example using fetch:
    /*
    fetch('/api/settings/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, isEnabled, credentials })
    })
    .then(response => response.json())
    .then(data => {
      // Handle response
    })
    .catch(error => {
      console.error('Error updating settings:', error);
    });
    */
  }

  function validateTelegramCredentials(apiKey, chatId) {
    // Placeholder: Implement actual validation logic, possibly via backend
    // For demonstration, assume any non-empty input is valid
    return apiKey.length > 0 && chatId.length > 0;
  }

  // Initialize the settings based on existing user preferences
  function initializeSettings() {
    // Placeholder: Fetch current settings from backend and initialize the UI
    // Example:
    /*
    fetch('/api/settings/notifications')
      .then(response => response.json())
      .then(settings => {
        emailToggle.checked = settings.email.enabled;
        telegramToggle.checked = settings.telegram.enabled;
        if (settings.telegram.enabled) {
          telegramSettings.classList.remove('hidden');
          telegramApiKey.value = settings.telegram.apiKey;
          telegramChatId.value = settings.telegram.chatId;
          telegramConfirmation.textContent = 'Telegram notifications activated.';
        }
        if (settings.email.enabled) {
          emailConfirmation.textContent = `Email notifications sent to ${getUserEmail()}.`;
        }
      })
      .catch(error => {
        console.error('Error fetching settings:', error);
      });
    */

    // For demonstration, assume all notifications are disabled initially
    emailToggle.checked = false;
    telegramToggle.checked = false;
    telegramSettings.classList.add('hidden');
    emailConfirmation.textContent = '';
    telegramConfirmation.textContent = '';
  }

  initializeSettings();
});
