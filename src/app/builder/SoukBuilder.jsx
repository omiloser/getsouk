import { useState, useRef } from "react";

// ─── Palette & constants ────────────────────────────────────────────
const TEAL = "#0D9488";
const AMBER = "#F59E0B";
const BG = "#FAFAF9";
const DARK = "#1C1917";

const CATEGORIES = [
  "Fashion & Clothing", "Accessories & Jewellery", "Beauty & Skincare",
  "Home Decor", "Food & Sweets", "Art & Prints", "Kids & Toys", "Other",
];

const CURRENCIES = ["AED", "SAR", "USD", "EUR", "GBP", "KWD", "QAR", "BHD", "OMR"];

const WHATSAPP_COUNTRIES = [
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+966", flag: "🇸🇦", name: "KSA" },
  { code: "+1",   flag: "🇺🇸", name: "US" },
  { code: "+44",  flag: "🇬🇧", name: "UK" },
  { code: "+91",  flag: "🇮🇳", name: "India" },
  { code: "+92",  flag: "🇵🇰", name: "Pakistan" },
  { code: "+20",  flag: "🇪🇬", name: "Egypt" },
  { code: "+962", flag: "🇯🇴", name: "Jordan" },
];

const Input = ({ label, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#57534E", marginBottom: 6 }}>{label}</label>}
    <input
      {...props}
      style={{
        width: "100%", boxSizing: "border-box", padding: "10px 14px",
        border: "1.5px solid #D6D3D1", borderRadius: 10, fontSize: 14,
        outline: "none", background: "#fff", color: DARK,
        transition: "border-color 0.2s",
        ...props.style,
      }}
      onFocus={e => e.target.style.borderColor = TEAL}
      onBlur={e => e.target.style.borderColor = "#D6D3D1"}
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#57534E", marginBottom: 6 }}>{label}</label>}
    <textarea
      {...props}
      style={{
        width: "100%", boxSizing: "border-box", padding: "10px 14px",
        border: "1.5px solid #D6D3D1", borderRadius: 10, fontSize: 14,
        outline: "none", background: "#fff", color: DARK, resize: "vertical", minHeight: 80,
        ...props.style,
      }}
      onFocus={e => e.target.style.borderColor = TEAL}
      onBlur={e => e.target.style.borderColor = "#D6D3D1"}
    />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#57534E", marginBottom: 6 }}>{label}</label>}
    <select
      {...props}
      style={{
        width: "100%", padding: "10px 14px", border: "1.5px solid #D6D3D1",
        borderRadius: 10, fontSize: 14, outline: "none", background: "#fff",
        color: DARK, cursor: "pointer",
        ...props.style,
      }}
    >
      {options.map(o => (
        <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
      ))}
    </select>
  </div>
);

const Btn = ({ children, variant = "primary", ...props }) => (
  <button
    {...props}
    style={{
      padding: "12px 24px", borderRadius: 12, fontSize: 15, fontWeight: 700,
      cursor: "pointer", border: "none", transition: "opacity 0.15s, transform 0.1s",
      background: variant === "primary" ? TEAL : variant === "amber" ? AMBER : "#E7E5E4",
      color: variant === "ghost" ? DARK : "#fff",
      ...props.style,
    }}
    onMouseEnter={e => { e.target.style.opacity = "0.88"; e.target.style.transform = "scale(1.02)"; }}
    onMouseLeave={e => { e.target.style.opacity = "1"; e.target.style.transform = "scale(1)"; }}
  >
    {children}
  </button>
);

const Steps = ({ current, total }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 32 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", flex: i < total - 1 ? 1 : 0 }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 13, fontWeight: 700,
          background: i < current ? TEAL : i === current ? TEAL : "#E7E5E4",
          color: i <= current ? "#fff" : "#78716C",
          flexShrink: 0,
        }}>
          {i < current ? "✓" : i + 1}
        </div>
        {i < total - 1 && (
          <div style={{ flex: 1, height: 2, background: i < current ? TEAL : "#E7E5E4", margin: "0 4px" }} />
        )}
      </div>
    ))}
  </div>
);

const ProductCard = ({ item, currency, waPrefix, waNumber, storeName }) => {
  const msg = encodeURIComponent(`Hi! I'm interested in "${item.name}" from ${storeName}. Is it available?`);
  const url = `https://wa.me/${waPrefix.replace("+", "")}${waNumber.replace(/\s/g, "")}?text=${msg}`;
  return (
    <div style={{
      background: "#fff", borderRadius: 16, overflow: "hidden",
      boxShadow: "0 2px 12px rgba(0,0,0,0.07)", transition: "transform 0.2s, box-shadow 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)"; }}
    >
      <div style={{
        height: 160, background: `linear-gradient(135deg, ${TEAL}22, ${AMBER}22)`,
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56,
      }}>
        {item.emoji || "🛙"}
      </div>
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: DARK, marginBottom: 4 }}>{item.name || "Product name"}</div>
        {item.description && (
          <div style={{ fontSize: 12, color: "#78716C", marginBottom: 8, lineHeight: 1.4 }}>{item.description}</div>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ fontWeight: 800, fontSize: 17, color: TEAL }}>{currency} {item.price || "—"}</span>
          <a href={url} target="_blank" rel="noreferrer"
            style={{
              background: "#25D366", color: "#fff", borderRadius: 8,
              padding: "6px 12px", fontSize: 12, fontWeight: 700,
              textDecoration: "none", display: "flex", alignItems: "center", gap: 6,
            }}>
            <span>💬</span> Buy
          </a>
        </div>
      </div>
    </div>
  );
};

const StorefrontPreview = ({ data }) => {
  const { storeName, tagline, category, waPrefix, waNumber, products, themeColor, instagramHandle } = data;
  const color = themeColor || TEAL;
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: BG, minHeight: "100vh" }}>
      <div style={{
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        padding: "32px 20px 28px", textAlign: "center", color: "#fff",
      }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🛙</div>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800 }}>{storeName || "My Souk"}</h1>
        {tagline && <p style={{ margin: "8px 0 0", opacity: 0.9, fontSize: 14 }}>{tagline}</p>}
        {category && (
          <span style={{
            display: "inline-block", marginTop: 10, background: "rgba(255,255,255,0.2)",
            padding: "4px 14px", borderRadius: 100, fontSize: 12, fontWeight: 600,
          }}>{category}</span>
        )}
        {instagramHandle && (
          <div style={{ marginTop: 12 }}>
            <a href={`https://instagram.com/${instagramHandle.replace("@","")}`} target="_blank" rel="noreferrer"
              style={{ color: "#fff", fontSize: 13, opacity: 0.85, textDecoration: "none" }}>
              📸 @{instagramHandle.replace("@","")}
            </a>
          </div>
        )}
      </div>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px" }}>
        {products && products.filter(p => p.name).length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16 }}>
            {products.filter(p => p.name).map((item, i) => (
              <ProductCard key={i} item={item} currency={data.currency || "AED"}
                waPrefix={waPrefix || "+971"} waNumber={waNumber || ""} storeName={storeName || "this store"} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#A8A29E" }}>
            <div style={{ fontSize: 40 }}>📦</div>
            <p style={{ marginTop: 12 }}>Your products will appear here</p>
          </div>
        )}
      </div>
      <div style={{ textAlign: "center", padding: "20px 16px 32px", color: "#A8A29E", fontSize: 12 }}>
        Built with <a href="https://getsouk.app" style={{ color: TEAL, textDecoration: "none", fontWeight: 700 }}>Souk</a>
      </div>
    </div>
  );
};

const StepStoreInfo = ({ data, onChange, onNext }) => (
  <div>
    <h2 style={{ fontSize: 22, fontWeight: 800, color: DARK, margin: "0 0 6px" }}>Your store</h2>
    <p style={{ color: "#78716C", fontSize: 14, marginTop: 0, marginBottom: 24 }}>Tell us about your shop</p>
    <Input label="Store name *" placeholder="e.g. Layla's Closet" value={data.storeName}
      onChange={e => onChange({ storeName: e.target.value })} />
    <Input label="Your tagline" placeholder="e.g. Handpicked modest fashion" value={data.tagline}
      onChange={e => onChange({ tagline: e.target.value })} />
    <Select label="Category" options={CATEGORIES} value={data.category}
      onChange={e => onChange({ category: e.target.value })} />
    <Input label="Instagram handle" placeholder="@yourbrand" value={data.instagramHandle}
      onChange={e => onChange({ instagramHandle: e.target.value })} />
    <Btn style={{ width: "100%", marginTop: 8 }} onClick={onNext} disabled={!data.storeName}>
      Continue →
    </Btn>
  </div>
);

const StepContact = ({ data, onChange, onNext, onBack }) => (
  <div>
    <h2 style={{ fontSize: 22, fontWeight: 800, color: DARK, margin: "0 0 6px" }}>Contact & payments</h2>
    <p style={{ color: "#78716C", fontSize: 14, marginTop: 0, marginBottom: 24 }}>Customers will contact you via WhatsApp</p>
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#57534E", marginBottom: 6 }}>WhatsApp number *</label>
      <div style={{ display: "flex", gap: 8 }}>
        <select value={data.waPrefix} onChange={e => onChange({ waPrefix: e.target.value })}
          style={{ padding: "10px 12px", border: "1.5px solid #D6D3D1", borderRadius: 10, fontSize: 14, background: "#fff", cursor: "pointer", flexShrink: 0 }}>
          {WHATSAPP_COUNTRIES.map(c => (
            <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
          ))}
        </select>
        <input value={data.waNumber} onChange={e => onChange({ waNumber: e.target.value })}
          placeholder="50 123 4567" style={{
            flex: 1, padding: "10px 14px", border: "1.5px solid #D6D3D1",
            borderRadius: 10, fontSize: 14, outline: "none", background: "#fff", color: DARK,
          }} />
      </div>
    </div>
    <Select label="Currency" options={CURRENCIES} value={data.currency} onChange={e => onChange({ currency: e.target.value })} />
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#57534E", marginBottom: 10 }}>Theme color</label>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {["#0D9488","#6366F1","#EC4899","#F59E0B","#10B981","#EF4444","#3B82F6","#8B5CF6"].map(c => (
          <div key={c} onClick={() => onChange({ themeColor: c })}
            style={{
              width: 36, height: 36, borderRadius: "50%", background: c, cursor: "pointer",
              border: data.themeColor === c ? `3px solid ${DARK}` : "3px solid transparent",
              transform: data.themeColor === c ? "scale(1.2)" : "scale(1)",
            }} />
        ))}
      </div>
    </div>
    <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
      <Btn variant="ghost" onClick={onBack} style={{ flex: 1 }}>← Back</Btn>
      <Btn onClick={onNext} disabled={!data.waNumber} style={{ flex: 2 }}>Continue →</Btn>
    </div>
  </div>
);

const PRODUCT_EMOJIS = ["👗","👜","💄","🗑️","🍫","🖼️","🧨","💍","👟","🌸","🧴","☕","🎀","🛙"];

const StepProducts = ({ data, onChange, onNext, onBack }) => {
  const products = data.products || [{ name: "", description: "", price: "", emoji: "🛙" }];
  const updateProduct = (i, field, value) => {
    const updated = products.map((p, idx) => idx === i ? { ...p, [field]: value } : p);
    onChange({ products: updated });
  };
  const addProduct = () => onChange({ products: [...products, { name: "", description: "", price: "", emoji: "🛙" }] });
  const removeProduct = (i) => onChange({ products: products.filter((_, idx) => idx !== i) });
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: DARK, margin: "0 0 6px" }}>Your products</h2>
      <p style={{ color: "#78716C", fontSize: 14, marginTop: 0, marginBottom: 24 }}>Add up to 12 items. You can edit anytime.</p>
      {products.map((product, i) => (
        <div key={i} style={{ background: "#fff", border: "1.5px solid #E7E5E4", borderRadius: 14, padding: "16px", marginBottom: 16, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#A8A29E", flex: 1 }}>ITEM {i + 1}</div>
            {products.length > 1 && (
              <button onClick={() => removeProduct(i)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", fontSize: 18, padding: 0 }}>✕</button>
            )}
          </div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#57534E", marginBottom: 8 }}>Pick an icon</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {PRODUCT_EMOJIS.map(em => (
                <span key={em} onClick={() => updateProduct(i, "emoji", em)}
                  style={{
                    fontSize: 22, cursor: "pointer", padding: 4, borderRadius: 8,
                    background: product.emoji === em ? `${TEAL}22` : "transparent",
                    border: product.emoji === em ? `1.5px solid ${TEAL}` : "1.5px solid transparent",
                  }}>
                  {em}
                </span>
              ))}
            </div>
          </div>
          <Input placeholder="Product name *" value={product.name} onChange={e => updateProduct(i, "name", e.target.value)} style={{ marginBottom: 10 }} />
          <Textarea placeholder="Short description (optional)" value={product.description} onChange={e => updateProduct(i, "description", e.target.value)} style={{ minHeight: 60, marginBottom: 10 }} />
          <Input placeholder={`Price (${data.currency || "AED"})`} value={product.price} onChange={e => updateProduct(i, "price", e.target.value)} style={{ marginBottom: 0 }} />
        </div>
      ))}
      {products.length < 12 && (
        <button onClick={addProduct}
          style={{ width: "100%", padding: "12px", border: `2px dashed ${TEAL}`, borderRadius: 14, background: "transparent", color: TEAL, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 20 }}>
          + Add another item
        </button>
      )}
      <div style={{ display: "flex", gap: 10 }}>
        <Btn variant="ghost" onClick={onBack} style={{ flex: 1 }}>← Back</Btn>
        <Btn onClick={onNext} disabled={!products.some(p => p.name)} style={{ flex: 2 }}>Preview my store →</Btn>
      </div>
    </div>
  );
};

const StepPreview = ({ data, onBack }) => {
  const [copied, setCopied] = useState(false);
  const fakeUrl = `getsouk.app/${(data.storeName || "myshop").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`;
  const handleCopy = () => {
    navigator.clipboard?.writeText(`https://${fakeUrl}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: DARK, margin: "0 0 6px" }}>🎉 Your store is ready!</h2>
      <p style={{ color: "#78716C", fontSize: 14, marginTop: 0, marginBottom: 20 }}>Share the link in your Instagram bio and WhatsApp status</p>
      <div style={{ background: `${TEAL}11`, border: `1.5px solid ${TEAL}33`, borderRadius: 14, padding: "16px", marginBottom: 24 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: TEAL, marginBottom: 8 }}>YOUR STORE LINK</div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ flex: 1, background: "#fff", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: DARK, fontWeight: 600, border: "1.5px solid #E7E5E4", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            🔗 {fakeUrl}
          </div>
          <Btn onClick={handleCopy} variant={copied ? "ghost" : "primary"} style={{ padding: "10px 16px", fontSize: 13 }}>
            {copied ? "✓ Copied!" : "Copy"}
          </Btn>
        </div>
      </div>
      <div style={{ background: `${AMBER}11`, border: `1.5px solid ${AMBER}44`, borderRadius: 14, padding: "16px", marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{ fontSize: 28 }}>⭐</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: DARK, marginBottom: 4 }}>Upgrade to Souk Pro</div>
            <div style={{ fontSize: 13, color: "#78716C", marginBottom: 12, lineHeight: 1.5 }}>Custom domain · Analytics · Unlimited products · Priority support</div>
            <Btn variant="amber" style={{ padding: "8px 18px", fontSize: 13 }}>Get Pro — AED 33/mo</Btn>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#57534E", marginBottom: 12 }}>Share your store</div>
        <div style={{ display: "flex", gap: 10 }}>
          <a href={`https://wa.me/?text=Check%20out%20my%20store%3A%20https%3A%2F%2F${fakeUrl}`} target="_blank" rel="noreferrer"
            style={{ flex: 1, textAlign: "center", background: "#25D366", color: "#fff", padding: "12px", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
            💬 WhatsApp
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"
            style={{ flex: 1, textAlign: "center", background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)", color: "#fff", padding: "12px", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>
            📸 Instagram
          </a>
        </div>
      </div>
      <Btn variant="ghost" onClick={onBack} style={{ width: "100%", marginBottom: 8 }}>← Edit store</Btn>
    </div>
  );
};

const STEPS = ["Store info", "Contact", "Products", "Go live!"];

export default function SoukBuilder() {
  const [step, setStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [data, setData] = useState({
    storeName: "", tagline: "", category: "Fashion & Clothing",
    instagramHandle: "", waPrefix: "+971", waNumber: "",
    currency: "AED", themeColor: TEAL,
    products: [{ name: "", description: "", price: "", emoji: "👗" }],
  });
  const update = (patch) => setData(d => ({ ...d, ...patch }));

  if (step === 3 && showPreview) {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh", background: "#f0f0f0", display: "flex", flexDirection: "column" }}>
        <div style={{ background: DARK, color: "#fff", padding: "12px 20px", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontWeight: 800, fontSize: 18, color: TEAL }}>Souk</span>
          <span style={{ color: "#78716C", fontSize: 13 }}>Live preview of your store</span>
          <button onClick={() => setShowPreview(false)}
            style={{ marginLeft: "auto", background: "none", border: "1.5px solid #555", borderRadius: 8, color: "#fff", padding: "6px 14px", cursor: "pointer", fontSize: 13 }}>
            ← Back to editor
          </button>
        </div>
        <div style={{ flex: 1, overflow: "auto" }}>
          <StorefrontPreview data={data} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: BG, minHeight: "100vh" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid #F0EFEE", padding: "14px 20px", display: "flex", alignItems: "center", gap: 10, position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ fontWeight: 900, fontSize: 22, color: TEAL, letterSpacing: "-0.5px" }}>souk</div>
        <div style={{ width: 1, height: 18, background: "#E7E5E4" }} />
        <div style={{ fontSize: 13, color: "#A8A29E" }}>Your shop in 60 seconds</div>
        {step === 3 && (
          <button onClick={() => setShowPreview(true)}
            style={{ marginLeft: "auto", background: TEAL, border: "none", borderRadius: 8, color: "#fff", padding: "7px 16px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
            👁 Preview
          </button>
        )}
      </div>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "32px 20px 64px" }}>
        <Steps current={step} total={STEPS.length} />
        {step === 0 && <StepStoreInfo data={data} onChange={update} onNext={() => setStep(1)} />}
        {step === 1 && <StepContact data={data} onChange={update} onNext={() => setStep(2)} onBack={() => setStep(0)} />}
        {step === 2 && <StepProducts data={data} onChange={update} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <StepPreview data={data} onBack={() => setStep(2)} />}
      </div>
      {step < 3 && data.storeName && (
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #E7E5E4", padding: "10px 20px", display: "flex", alignItems: "center", gap: 12, boxShadow: "0 -4px 20px rgba(0,0,0,0.06)" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: data.themeColor || TEAL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🛙</div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: DARK }}>{data.storeName}</div>
            {data.tagline && <div style={{ fontSize: 12, color: "#A8A29E", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{data.tagline}</div>}
          </div>
          <span style={{ fontSize: 12, color: TEAL, fontWeight: 600 }}>Building...</span>
        </div>
      )}
    </div>
  );
}
