export const resetPasswordSubjectAndHtmlBoy = (user, url) => ({
  subject: 'Barefoot Nomad Password Reset',
  html: `<!DOCTYPE html>
  <html>
    <head>
      <style type="text/css">
      body{ height: 100%; text-align: center; color: #000}
      .barefoot-color{ color: #3AB397; }
      a.button{ background-color:#fff; color: #3AB397; border: 2px solid #3AB397; border-radius: 20px 20px; padding: 15px 32px; text-decoration: none; display: inline-block; font-size: 16px; }
      a.button:hover{ background-color: #3AB397; color: #fff; }
      </style>
      <title></title>
    </head>
    <body>
      <h2>Welcome to <span class="barefoot-color">Barefoot Nomad</span></h2>
      <p>Hey ${user.name},</p>
      <p>We heard that you lost your password. Sorry about that!</p>
      <p>But don’t worry! You can use the following link to reset your password:</p>
      <a class="button" href=${url}>Click here to reset your password</a>
      <p>–Your supporter at Barefoot Nomad</p>
    </body>
  </html>`,
});

export const passwordResetWellSubjectAndHtmlBoy = (user) => ({
  subject: 'Barefoot Nomad, Password reset successfully!',
  html: `<!DOCTYPE html>
  <html>
    <head>
      <style type="text/css">
      body{ height: 100%; text-align: center; color: #000}
      .barefoot-color{ color: #3AB397; }
      </style>
      <title></title>
    </head>
    <body>
      <h2>Welcome to <span class="barefoot-color">Barefoot Nomad</span></h2>
      <p>Hey ${user.name},</p>
      <p>Your password has been reset successfully!</p>
      <p>–Your supporter at Barefoot Nomad</p>
    </body>
  </html>`,
});

export const sendEmailTemplate = (from, user, { subject, html }) => {
  const to = user.email;
  return {
    from, to, subject, html,
  };
};
