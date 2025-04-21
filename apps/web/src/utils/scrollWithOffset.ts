export const scrollWithOffset = (element: any) => {
  const currentPosition = element.getBoundingClientRect().top;
  if (currentPosition) {
    const offset = 250;
    const finalPosition = currentPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: finalPosition,
      behavior: 'smooth',
    });
  }
};
