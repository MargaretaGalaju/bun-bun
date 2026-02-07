export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Marketplace</h1>
      <p>Your one-stop shop for everything.</p>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <a
          href="/products"
          style={{
            padding: '0.75rem 1.5rem',
            background: '#0070f3',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
          }}
        >
          Browse Products
        </a>
      </div>
    </div>
  );
}
