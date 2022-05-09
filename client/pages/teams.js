import { TeamsController } from "../components/controllers/TeamsController";

export default function TeamsPage() {
    return (
        <div className="mb-auto">
            <div className="flex flex-col justify-center items-center">
                <div className="py-4">
                    <h1>Teams Page</h1>
                </div>
                <TeamsController />
            </div>
        </div>
    );
}
