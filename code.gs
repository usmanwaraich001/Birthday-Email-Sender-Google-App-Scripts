function sendBirthdayEmails() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data Sheet");
  var data = sheet.getDataRange().getValues();

  var tz = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone();
  var today = new Date();
  var todayMMDD = Utilities.formatDate(today, tz, "MM-dd");

  for (var i = 1; i < data.length; i++) { // skip header row
    var name = data[i][0];
    var email = data[i][1];
    var birthday = data[i][2]; // should be Date object if column formatted as Date

    if (birthday) {
      var bMMDD = Utilities.formatDate(new Date(birthday), tz, "MM-dd");

      if (bMMDD === todayMMDD) {
        var subject = "🎉 Happy Birthday " + name + "!";
        var message = "Dear " + name + ",\n\n" +
                      "Wishing you a very Happy Birthday! 🥳🎂\n\n" +
                      "Warm regards,\nAgneay B Nair";

        MailApp.sendEmail(email, subject, message);
        Logger.log("✅ Sent to " + name + " (" + email + ")");
      } else {
        Logger.log("ℹ️ Row " + (i+1) + ": not birthday today (" + bMMDD + ")");
      }
    } else {
      Logger.log("⚠️ Row " + (i+1) + ": No birthday value found");
    }
  }
}
