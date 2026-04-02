import { Ruler } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Container } from '../components/ui/Container.jsx';

function Table({ title, caption, headers, rows }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900/60">
      <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="font-display text-lg font-bold text-neutral-900 dark:text-white">{title}</h2>
        {caption ? <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{caption}</p> : null}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950/50">
              {headers.map((h) => (
                <th key={h} className="px-4 py-3 font-semibold text-neutral-900 dark:text-white">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-neutral-100 last:border-0 dark:border-neutral-800/80 odd:bg-neutral-50/50 dark:odd:bg-neutral-950/30"
              >
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 tabular-nums text-neutral-700 dark:text-neutral-300">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function SizeChartPage() {
  return (
    <Container className="py-8 sm:py-10 lg:py-12">
      <div className="mb-10 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Fit guide</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          Size chart
        </h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          Vintage and sportswear cuts vary by era and brand. Use these charts as a starting point, then compare listed
          measurements on each product when available. When in doubt, size up for layering or message us before you buy.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-300">
          <Ruler className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.75} />
          <span>All measurements are approximate body references, not garment flat lays.</span>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Table
          title="Tops & jerseys"
          caption="Chest is measured around the fullest part; length is high shoulder to hem."
          headers={['Size', 'Chest (in)', 'Length (in)']}
          rows={[
            ['XS', '34–36', '26–27'],
            ['S', '36–38', '27–28'],
            ['M', '38–40', '28–29'],
            ['L', '40–42', '29–30'],
            ['XL', '42–45', '30–31'],
            ['XXL', '45–48', '31–33'],
          ]}
        />
        <Table
          title="Bottoms"
          caption="Waist is natural waist; inseam is typical for standard vintage cuts."
          headers={['Size', 'Waist (in)', 'Inseam (in)']}
          rows={[
            ['XS', '28–29', '30'],
            ['S', '30–31', '30–32'],
            ['M', '32–33', '32'],
            ['L', '34–35', '32'],
            ['XL', '36–38', '32–33'],
            ['XXL', '38–40', '33'],
          ]}
        />
      </div>

      <div className="mt-8 max-w-xl">
        <Table
          title="Footwear (US men’s)"
          caption="Sneaker sizing can run narrow on older models; width noted in listings when relevant."
          headers={['US', 'EU (approx.)', 'UK (approx.)']}
          rows={[
            ['7', '40', '6'],
            ['8', '41', '7'],
            ['9', '42.5', '8'],
            ['10', '44', '9'],
            ['11', '45', '10'],
            ['12', '46', '11'],
          ]}
        />
      </div>

      <div className="mt-12 flex flex-wrap gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/40">
        <p className="w-full text-sm text-neutral-700 dark:text-neutral-300">
          Still unsure? Send your height, weight, and usual sizes — we will help you pick.
        </p>
        <Button to="/contact">Contact us</Button>
        <Button to="/shop" variant="secondary">
          Back to shop
        </Button>
      </div>
    </Container>
  );
}
