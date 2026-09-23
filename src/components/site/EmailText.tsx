/**
 * An email address that, when a narrow column forces it to wrap, wraps after
 * the "@" — "contact@ / magmalegal.com" — rather than wherever the line runs
 * out, which is how "contact@magmal / egal.com" happens. Pair with
 * `break-words`, not `break-all`: the former only splits a word that cannot fit
 * on a line of its own, the latter splits every word it can.
 */
export function EmailText({ address }: { address: string }) {
  const at = address.indexOf("@");
  if (at < 0) return <>{address}</>;
  return (
    <>
      {address.slice(0, at + 1)}
      <wbr />
      {address.slice(at + 1)}
    </>
  );
}
