export default function classNames(...c) {
  return c.filter(Boolean).join(" ");
}
