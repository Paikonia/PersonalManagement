export const verifyUserData = (body: any) => {
  let err = "";
  const { firstName, lastName, username, email, password, confirmPassword } =
    body;

  if (firstName && firstName.trim() === "") err += ", First name";
  if (lastName && lastName.trim() === "") err += ", Last name";
  if (username && username.trim() === "") err += ", username";
  if (email && email.trim() === "") err += ", username";
  if (password && password.trim() === "") err += ", username";

  const message = err.trim() !== "" ? `The fields${err}` : "";
  if (message !== "") return { message, data: null };
  const data = {
    ...body,
    email: body.email.toUpperCase().trim(),
    firstName: body.firstName.trim().toUpperCase().trim(),
    lastName: body.lastName.trim().toUpperCase(),
    username: body.username.trim().toLowerCase()
  };
  return {
    message,
    data,
  };
};
