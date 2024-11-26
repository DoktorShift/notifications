document.addEventListener('DOMContentLoaded', () => {
  const emailToggle = document.getElementById('email-notifications');
  const telegramToggle = document.getElementById('telegram-notifications');
  const telegramSettings = document.getElementById('telegram-settings');
  const emailConfirmation = document.getElementById('email-confirmation');
  const telegramConfirmation = document.getElementById('telegram-confirmation');
  const telegramChatId = document.getElementById('telegram-chat-id');

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
      // Optionally, focus the Chat ID input field
      telegramChatId.focus();
    } else {
      telegramSettings.classList.add('hidden');
      telegramConfirmation.textContent = '';
      // TODO: Integrate with backend to disable telegram notifications
      updateNotificationSetting('telegram', false);
    }
  });

  // Function to handle Telegram Settings Input
  const handleTelegramSettings = () => {
    const chatId = telegramChatId.value.trim();

    if (chatId) {
      // TODO: Validate and send Telegram Chat ID to backend
      const isValid = validateTelegramChatId(chatId);
      if (isValid) {
        telegramConfirmation.textContent = 'Telegram notifications activated.';
        updateNotificationSetting('telegram', true, { chatId });
      } else {
        telegramConfirmation.textContent = 'Invalid Telegram Chat ID. Please try again.';
      }
    } else {
      telegramConfirmation.textContent = 'Please enter your Chat ID.';
    }
  };

  // Event listeners for Telegram Chat ID input field
  telegramChatId.addEventListener('blur', handleTelegramSettings);
  telegramChatId.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleTelegramSettings();
    }
  });

  // Placeholder Functions for Backend Integration
  function getUserEmail() {
    // Placeholder: Replace with actual logic to retrieve the user's email
    return 'YourBuhoMailAddress@domain.com';
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

  function validateTelegramChatId(chatId) {
    // Placeholder: Implement actual validation logic, possibly via backend
    // For demonstration, assume any non-empty input is valid
    return chatId.length > 0;
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
