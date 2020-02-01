export const resetPasswordSubjectAndHtmlBoy = (user, url) => ({
  subject: 'Barefoot Nomad Password Reset',
  html: `<h2>Welcome to Barefoot Nomad</h2>
      <p>Hey ${user.name},</p>
      <p>We heard that you lost your password. Sorry about that!</p>
      <p>But don’t worry! You can use the following link to reset your password:</p>
      <a style="color:#3AB397;" href=${url}>Click here to reset your password</a>
      <p>–Your supporter at Barefoot Nomad</p>`,
});

export const sendEmailTemplate = (from, user, { subject, html }) => {
  const to = user.email;
  return {
    from, to, subject, html,
  };
};
