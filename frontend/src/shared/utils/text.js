export const truncateText = (input, maxLength) =>
   input.length > maxLength ? `${input.substring(0, maxLength)}...` : input;
