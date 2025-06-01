function validateEmail(email: string) {
  // Регулярное выражение для проверки email
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export default validateEmail;
