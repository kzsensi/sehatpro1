export const getRandomString = (length, characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789") => {
    let result = "";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
};

export const setTheme = (featureData) => {
    document.documentElement.style.setProperty(
        "--startGradient",
        featureData?.cardGrad1
    );
    document.documentElement.style.setProperty(
        "--endGradient",
        featureData?.cardGrad2
    );
    document.documentElement.style.setProperty(
        "--lightstartGradient",
        featureData?.cardGrad1 + "20"
    );
    document.documentElement.style.setProperty(
        "--lightendGradient",
        featureData?.cardGrad2 + "20"
    );
    document.documentElement.style.setProperty("--textColor", featureData?.text);
};


export const getEmailBody = (name, email, phone, message) => {
    return `<!DOCTYPE html>\r\n<html>\r\n  <head>\r\n    <meta charset=\"UTF-8\" />\r\n    <style>\r\n      body {\r\n        font-family: Arial, sans-serif;\r\n             color: #333;\r\n      }\r\n      .container {\r\n        padding: 20px;\r\n        border: 1px solid #ddd;\r\n        background-color: #f9f9f9;\r\n       margin: auto;\r\n      }\r\n      .label {\r\n        font-weight: bold;\r\n        margin-top: 10px;\r\n      }\r\n      .value {\r\n        margin-bottom: 10px;\r\n      }\r\n      .message {\r\n        white-space: pre-line;\r\n     }\r\n    </style>\r\n  </head>\r\n  <body>\r\n    <div class=\"container\">\r\n      <div>\r\n        <div class=\"label\">Name:</div>\r\n        <div class=\"value\">${name}</div>\r\n\r\n        <div class=\"label\">Email:</div>\r\n        <div class=\"value\">${email}</div>\r\n\r\n        <div class=\"label\">Phone:</div>\r\n        <div class=\"value\">${phone}</div>\r\n\r\n        <div class=\"label\">Message:</div>\r\n        <div class=\"message\">${message}</div>\r\n      </div>\r\n    </div>\r\n  </body>\r\n</html>\r\n`;
}
