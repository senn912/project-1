const adminMiddleware = (req, res, next) => {
  const user = res.locals.user;
  if (!user || user.role !== "admin") {
    return res.send(`<script>
        alert("You are not authorized to access this page.");
        window.location.href = "/";
      </script>`);
  }
  next();
};

module.exports = adminMiddleware;
