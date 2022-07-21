const getFirstName = (fullname: string): string => {
  const firstName = fullname.split(" ")[0] || "";
  return firstName;
};

export { getFirstName };
