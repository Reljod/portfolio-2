type Props = {};

const UnauthorizedPage = (props: Props) => {
  return (
    <main className="flex flex-row h-screen w-screen justify-center items-center text-3xl text-center space-x-2">
      <h1 className="mr-2">401</h1> |
      <h2 className="text-2xl">Unauthorized Access</h2>
    </main>
  );
};

export default UnauthorizedPage;
