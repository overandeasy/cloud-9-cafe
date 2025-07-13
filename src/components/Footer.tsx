function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className=" flex space-x-1 p-4 justify-between text-gray-500 dark:text-gray-500 text-sm">
      <div> Designed by David Zhiwei Luo</div>
      <div>A Code Academy Berlin Bootcamp Project</div>
      <div>© {year} All Rights Reserved</div>
    </div>
  );
}

export default Footer;
