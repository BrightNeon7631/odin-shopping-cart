export async function getProducts() {
    const res = await fetch('/api/store');
    if (!res.ok) {
        throw {
            message: "Failed to fetch products",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    return data.products;
}

export async function getProduct(id) {
    const res = await fetch(`/api/store/${id}`);
    if (!res.ok) {
        throw {
            message: "Failed to fetch product",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    return data.products;
}