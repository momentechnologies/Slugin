export default (...params) => {
  if (!window.fbq) {
    console.log(params);
    return;
  }
  window.fbq(...params);
};
