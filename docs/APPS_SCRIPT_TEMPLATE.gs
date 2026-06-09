// ═══════════════════════════════════════════════════════════
// Hautgefühl Beauty Salon – Google Apps Script Backend
// Handles bookings, email sends, and data management
// ═══════════════════════════════════════════════════════════

// CONFIG
const SHEET_ID = "YOUR_GOOGLE_SHEET_ID_HERE"; // Replace with your Sheet ID
const SHEET_NAME = "Bookings";

// ─────────────────────────────────────────────────────────
// MAIN HANDLERS
// ─────────────────────────────────────────────────────────

/**
 * Handles POST requests from React app
 * Receives booking data, saves to Sheets, sends confirmation email
 */
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!payload.clientName || !payload.email || !payload.serviceName) {
      return ContentService
        .createTextOutput(JSON.stringify({success: false, error: "Missing required fields"}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add to Sheets
    const bookingId = appendBooking(payload);
    
    // Send confirmation email
    sendConfirmationEmail(payload);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        bookingId: bookingId,
        message: "Booking confirmed and email sent"
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log("Error in doPost: " + error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests from React app
 * action=getBookings → returns all bookings
 * action=getPromos → returns active promotions
 */
function doGet(e) {
  try {
    const action = e.parameter.action || "getBookings";
    
    if (action === "getBookings") {
      const bookings = getAllBookings();
      return ContentService
        .createTextOutput(JSON.stringify({success: true, bookings: bookings}))
        .setMimeType(ContentService.MimeType.JSON);
        
    } else if (action === "getPromos") {
      const promos = getActivePromos();
      return ContentService
        .createTextOutput(JSON.stringify({success: true, promos: promos}))
        .setMimeType(ContentService.MimeType.JSON);
        
    } else {
      return ContentService
        .createTextOutput(JSON.stringify({success: false, error: "Unknown action"}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (error) {
    Logger.log("Error in doGet: " + error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ─────────────────────────────────────────────────────────
// BOOKING MANAGEMENT
// ─────────────────────────────────────────────────────────

/**
 * Appends a new booking to the Sheets
 * Returns the booking ID
 */
function appendBooking(data) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  
  // Get next ID
  const lastRow = sheet.getLastRow();
  const nextId = lastRow > 1 ? parseInt(sheet.getRange(lastRow, 1).getValue()) + 1 : 1;
  
  // Prepare row
  const newRow = [
    nextId,                    // A: ID
    data.clientName,           // B: ClientName
    data.email,                // C: Email
    data.phone || "",          // D: Phone
    data.serviceName,          // E: ServiceName
    data.servicePrice,         // F: ServicePrice
    data.specialist,           // G: Specialist
    data.date,                 // H: Date
    data.time,                 // I: Time
    data.duration,             // J: Duration
    "confirmed",               // K: Status
    new Date(),                // L: CreatedAt
    ""                         // M: Notes
  ];
  
  // Append to sheet
  sheet.appendRow(newRow);
  
  Logger.log("Booking " + nextId + " created for " + data.clientName);
  return nextId;
}

/**
 * Gets all bookings from Sheets
 */
function getAllBookings() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  const bookings = [];
  for (let i = 1; i < data.length; i++) { // Skip header
    const row = data[i];
    bookings.push({
      id: row[0],
      clientName: row[1],
      email: row[2],
      phone: row[3],
      serviceName: row[4],
      servicePrice: row[5],
      specialist: row[6],
      date: row[7],
      time: row[8],
      duration: row[9],
      status: row[10]
    });
  }
  
  return bookings;
}

/**
 * Gets all active promotions from Sheets
 */
function getActivePromos() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName("Promos");
  const data = sheet.getDataRange().getValues();
  
  const promos = [];
  for (let i = 1; i < data.length; i++) { // Skip header
    const row = data[i];
    if (row[6]) { // Active checkbox
      promos.push({
        id: row[0],
        title: row[1],
        description: row[2],
        discount: row[3],
        category: row[4],
        expiresAt: row[5]
      });
    }
  }
  
  return promos;
}

// ─────────────────────────────────────────────────────────
// EMAIL SENDING
// ─────────────────────────────────────────────────────────

/**
 * Sends confirmation email to customer
 */
function sendConfirmationEmail(booking) {
  const htmlBody = buildConfirmationEmailHTML(booking);
  
  try {
    GmailApp.sendEmail(
      booking.email,
      "Deine Terminbestätigung ✨ – Hautgefühl Salon",
      "Dein Termin ist bestätigt!", // Plain text fallback
      {
        htmlBody: htmlBody,
        from: "info@hautgefuehl-warburg.de", // Change to your email
        name: "Hautgefühl Salon"
      }
    );
    
    Logger.log("Email sent to " + booking.email);
    return true;
    
  } catch (error) {
    Logger.log("Email error: " + error);
    return false;
  }
}

/**
 * Builds HTML email template
 */
function buildConfirmationEmailHTML(booking) {
  const googleCalendarLink = buildGoogleCalendarLink(booking);
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Plus Jakarta Sans', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(107,47,94,0.1); }
        .header { background: linear-gradient(135deg, #6B2F5E, #C084A8); padding: 30px 20px; text-align: center; color: white; }
        .header-logo { width: 60px; height: 60px; border-radius: 50%; background: white; margin: 0 auto 15px; }
        .header h1 { font-family: 'Cormorant Garamond', serif; margin: 0; font-size: 28px; }
        .body { padding: 30px 20px; }
        .greeting { font-size: 16px; color: #1C1B1F; margin-bottom: 20px; }
        .details-box { background: #FDF0F8; border-radius: 14px; padding: 20px; margin: 20px 0; border-left: 4px solid #DB2777; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #F3E0EE; }
        .detail-label { color: #79607A; font-size: 13px; font-weight: 600; }
        .detail-value { color: #1C1B1F; font-size: 14px; font-weight: 700; }
        .cta-button { display: inline-block; background: #4285F4; color: white; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: 700; margin: 20px 0; text-align: center; }
        .footer { background: #F7F2FC; padding: 20px; text-align: center; color: #79607A; font-size: 12px; }
        .footer strong { color: #6B2F5E; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="header-logo" style="background: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2245%22 fill=%22%236B2F5E%22/></svg>'); background-size: contain;"></div>
          <h1>Termin bestätigt</h1>
        </div>
        
        <div class="body">
          <p class="greeting">Liebe/r <strong>${booking.clientName}</strong>,</p>
          <p>dein Termin bei Hautgefühl ist bestätigt! Hier sind deine Details:</p>
          
          <div class="details-box">
            <div class="detail-row">
              <span class="detail-label">📋 Leistung</span>
              <span class="detail-value">${booking.serviceName}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">💁 Fachkraft</span>
              <span class="detail-value">${booking.specialist}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">📅 Datum</span>
              <span class="detail-value">${formatDate(booking.date)}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">🕐 Uhrzeit</span>
              <span class="detail-value">${booking.time} Uhr</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">⏱️ Dauer</span>
              <span class="detail-value">${booking.duration} Minuten</span>
            </div>
            <div class="detail-row" style="border-bottom: none;">
              <span class="detail-label">💶 Preis</span>
              <span class="detail-value">${booking.servicePrice} €</span>
            </div>
          </div>
          
          <p style="background: #F7F2FC; padding: 12px 14px; border-radius: 12px; color: #5B4A5E; margin: 20px 0;">
            📍 <strong>Hauptstraße 82, 34414 Warburg</strong>
          </p>
          
          <div style="text-align: center;">
            <a href="${googleCalendarLink}" class="cta-button">📅 Zu Google Kalender hinzufügen</a>
          </div>
          
          <p style="color: #79607A; text-align: center; margin-top: 30px; border-top: 1px solid #F3EDF7; padding-top: 20px;">
            Solltest du den Termin nicht wahrnehmen können, gib uns bitte rechtzeitig Bescheid.<br><br>
            <strong style="color: #6B2F5E;">Dein Hautgefühl-Team</strong>
          </p>
        </div>
        
        <div class="footer">
          <p>© 2026 Hautgefühl Beauty Salon | Hauptstraße 82 | 34414 Warburg</p>
          <p>Instagram: @hautgefuehl.warburg</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  return html;
}

/**
 * Builds Google Calendar deep link
 */
function buildGoogleCalendarLink(booking) {
  const [year, month, day] = booking.date.split('-');
  const [hour, minute] = booking.time.split(':');
  
  // Calculate end time based on duration
  let endMinute = parseInt(minute) + booking.duration;
  let endHour = parseInt(hour) + Math.floor(endMinute / 60);
  endMinute = endMinute % 60;
  
  const startDate = year + month + day + "T" + hour + minute + "00";
  const endDate = year + month + day + "T" + String(endHour).padStart(2, "0") + String(endMinute).padStart(2, "0") + "00";
  
  const text = encodeURIComponent("Hautgefühl – " + booking.serviceName);
  const details = encodeURIComponent(
    "Dein Termin bei Hautgefühl Beauty Salon\n\n" +
    "Leistung: " + booking.serviceName + "\n" +
    "Fachkraft: " + booking.specialist + "\n" +
    "Dauer: " + booking.duration + " Min\n" +
    "Preis: " + booking.servicePrice + " €\n\n" +
    "Wir freuen uns auf dich!"
  );
  const location = encodeURIComponent("Hautgefühl, Hauptstraße 82, 34414 Warburg");
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
}

/**
 * Helper: Format date from YYYY-MM-DD to DD.MM.YYYY
 */
function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-');
  return day + "." + month + "." + year;
}

// ─────────────────────────────────────────────────────────
// TESTING
// ─────────────────────────────────────────────────────────

/**
 * Test function (run manually)
 * Apps Script > Run > testBooking
 */
function testBooking() {
  const testData = {
    clientName: "Test User",
    email: "test@example.com",
    phone: "+491234567890",
    serviceName: "Wimpern 1:1 Neumodellage",
    servicePrice: 95,
    specialist: "Selma",
    date: "2026-06-20",
    time: "14:00",
    duration: 160
  };
  
  const id = appendBooking(testData);
  Logger.log("Test booking created with ID: " + id);
  
  // Uncomment to test email:
  // sendConfirmationEmail(testData);
  // Logger.log("Test email sent to " + testData.email);
}

/**
 * Deploy this script as Web App:
 * 1. Save this file
 * 2. Click "Deploy" → "New Deployment"
 * 3. Select "Web app"
 * 4. Execute as: Your Account
 * 5. Allow access: Anyone
 * 6. Copy the deployment URL
 * 7. Add to React app as REACT_APP_WEBHOOK_URL
 */

// ═══════════════════════════════════════════════════════════
// END OF SCRIPT
// ═══════════════════════════════════════════════════════════
