export const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<string | null>>) => {
  const file = e.currentTarget.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setImage(reader.result as string);
  };
};

export const handlePasswordStrength = (e: React.ChangeEvent<HTMLInputElement>, setStrength: React.Dispatch<React.SetStateAction<string | null>>) => {
  const password = e.currentTarget.value;
  const checks = {
    number: /\d/.test(password),
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  switch (score) {
    case 0:
    case 1:
      setStrength('weak');
      break;
    case 2:
      setStrength('simple');
      break;
    case 3:
      setStrength('medium');
      break;
    default:
      setStrength('strong');
      break;
  }

};