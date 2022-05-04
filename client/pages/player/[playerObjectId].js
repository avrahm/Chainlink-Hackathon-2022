export default function PlayerPage() {
    const router = useRouter();
    const playerObjectId = router.query.playerObjectId;
    return (
        <div className="mb-auto">
            <div>
                <h1>Player Page</h1>
            </div>
            <p>{playerObjectId}</p>
        </div>
    );
}
