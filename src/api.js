export async function getProducts() {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) {
        throw {
            message: "Failed to fetch products",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    console.log(data);
    return data;
}

export async function getProduct(id) {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
        throw {
            message: "Failed to fetch product",
            statusText: res.statusText,
            status: res.status
        }
    }
    const data = await res.json();
    return data;
}