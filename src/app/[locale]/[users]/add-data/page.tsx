import dynamic from "next/dynamic"

const LazyAddDataComponent = dynamic(() => import("./addDataComponent"));

export default async function AddData() {

    return (
        <LazyAddDataComponent />
    )
}