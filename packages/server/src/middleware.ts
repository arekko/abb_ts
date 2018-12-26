const isAuthenticated = async (
  resolve: any,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  if (!context.session.userId) {
    throw new Error("not authenticated");
  }

  await resolve(parent, args, context, info);
};

export const middleware = {
  Mutation: {
    createListing: isAuthenticated,
    deleteListing: isAuthenticated
  }
};
