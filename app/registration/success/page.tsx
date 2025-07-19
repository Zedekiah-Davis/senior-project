export default function Page({
    searchParams: { amount },
}: {
    searchParams: { amount: string };
}) {

    return (
    <p>Thank you, you have paid ${amount}.</p>
    );
}