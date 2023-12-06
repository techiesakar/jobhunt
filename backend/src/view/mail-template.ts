const MailTemplate = (text) => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>NodeMailer Email Template</title>
          <style>
            .container {
              width: 100%;
              height: 100%;
              padding: 20px;
              background-color: #f4f4f4;
            }
            .email {
              width: 100%;
              margin: 0 auto;
              background-color: #fff;
              padding: 0px;
            }
            .email-header {
              background-color: #333;
              color: #fff;
              padding: 10px;
              text-align: center;
            }
            .email-body {
              padding: 20px;
            }
            .email-footer {
              background-color: #333;
              color: #fff;
              padding: 20px;
              text-align: center;
            }
  
          </style>
        </head>
        <body>
          <div class="container">
            <div class="email">
              <div class="email-header">
                <h2>User Account Verification</h2>
              </div>
              <div class="email-body">
                <p>${text}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
};

export default MailTemplate;
