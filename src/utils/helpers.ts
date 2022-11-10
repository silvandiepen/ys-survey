export const c = (input: any[]) => {
  return [
    ...new Set(
      input.map((v) => {
        if (v) return v;
      })
    ),
  ].filter((v) => v !== undefined).join(" ");
};
