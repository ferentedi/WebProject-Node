module.exports = (req, res) => {
  res.status(404).render('error', { error: 'The requested endpoint is not found' });
};
