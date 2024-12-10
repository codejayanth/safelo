import emailjs from '@emailjs/browser';
import { addDays, format } from 'date-fns';
import { Receipt } from '../types';

// Initialize EmailJS
emailjs.init("jfKyWuzSrNXykJRYv");

export async function scheduleNotification(receipt: Receipt) {
  if (!receipt.reminderDate || !receipt.notificationMethod || !receipt.notificationContact) {
    throw new Error('Missing required notification information');
  }

  const reminderDate = new Date(receipt.reminderDate);
  const notificationDate = addDays(reminderDate, -2); // 2 days before

  try {
    if (receipt.notificationMethod === 'email') {
      await sendEmailNotification(receipt);
    } else if (receipt.notificationMethod === 'sms') {
      await sendSMSNotification(receipt);
    }
  } catch (error) {
    console.error('Notification error:', error);
    throw new Error('Failed to schedule notification');
  }
}

async function sendEmailNotification(receipt: Receipt) {
  const templateParams = {
    to_email: receipt.notificationContact,
    reminder_date: format(new Date(receipt.reminderDate!), 'PPP'),
    store_name: receipt.store || 'Unknown Store',
    amount: receipt.amount || 'Unknown Amount',
    receipt_image: receipt.image,
    receipt_text: receipt.text,
    notification_date: format(addDays(new Date(receipt.reminderDate!), -2), 'PPP')
  };

  try {
    const response = await emailjs.send(
      'service_wscplnu',
      'template_vwkqt2i',
      templateParams
    );
    
    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }
    
    return true;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    throw error;
  }
}

async function sendSMSNotification(receipt: Receipt) {
  // For demo purposes, we'll simulate a successful SMS notification
  // In production, this would connect to a backend service that handles SMS
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('SMS notification simulated for:', receipt.notificationContact);
      resolve(true);
    }, 1000);
  });
}