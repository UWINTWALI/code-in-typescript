interface FormState {
  email: string;
  password: string;
}

let formState: FormState = {
  email: "",
  password: "",
};

function handleFormChange<T>(formState: T, field: keyof T, value: any): T {
  return { ...formState, [field]: value };
}

(window as any).updateFormState = () => {
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;

  formState = handleFormChange(formState, "email", email);
  formState = handleFormChange(formState, "password", password);

  (document.getElementById("output") as HTMLElement).textContent = JSON.stringify(formState, null, 2);
};
