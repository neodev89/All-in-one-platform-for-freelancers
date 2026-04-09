import dynamic from "next/dynamic";

const LazyDashboardModalRow = dynamic(() => import("./modalRow"));

export default async function Modal() {

    return (
        <LazyDashboardModalRow />
    )
}