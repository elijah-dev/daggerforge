import { createTRPCRouter, publicProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate a delay

    return [
      {
        id: "1",
        name: "John Doe",
        email: "asd@asd.asd",
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "zxc@zxc.zx",
      },
    ];
  }),
});
