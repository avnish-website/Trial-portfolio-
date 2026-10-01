# AVNEDIT — Google Sheets Setup (phone se ho jata hai)

Flow:  Website form → `/api/orders` (Vercel) → Google Apps Script → Google Sheet

Do alag sheets:
- **Video Editing orders** → Vercel variable `GOOGLE_SHEETS_WEBHOOK_URL`
- **Graphic Design orders** → Vercel variable `GOOGLE_SHEETS_WEBHOOK_URL_GRAPHIC`

## Har sheet ke liye (dono sheets mein same steps)

1. Google Sheet kholo → **Extensions → Apps Script**
2. Purana code hata ke yeh paste karo (headers apne aap ban jayenge):

```javascript
const HEADERS = [
  "Date", "Order ID", "Customer Code", "Selected Plan", "Plan Price",
  "Customer Name", "Customer Email", "Selected Services", "Requirements",
  "Reference Links", "Google Drive Links", "Deadline", "Other Request",
  "Files Note", "Order Status", "Payment Status",
];

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    sheet.appendRow([
      d.date, d.orderId, d.customerCode, d.selectedPlan, d.planPrice,
      d.customerName, d.customerEmail, d.selectedServices, d.requirements,
      d.referenceLinks, d.driveLinks, d.deadline, d.otherRequest,
      d.filesNote, d.orderStatus, d.paymentStatus,
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. **Save** → **Deploy → New deployment** → Web app → Execute as: **Me** → Who has access: **Anyone** → Deploy
   (agar pehle se deployed hai: **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy** — URL wahi rahega)
4. URL copy karo (`https://script.google.com/macros/s/.../exec`)

## Vercel mein URL daalo

Vercel → Project → **Settings → Environment Variables**
- `GOOGLE_SHEETS_WEBHOOK_URL` = video sheet ka URL
- `GOOGLE_SHEETS_WEBHOOK_URL_GRAPHIC` = graphic sheet ka URL (jab ready ho)

Save → **Deployments → ⋯ → Redeploy**.

Note: `api/orders.js` project ke **root** mein hai (Vercel yahin se function uthata hai).
