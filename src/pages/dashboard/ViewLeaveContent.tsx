export default function ViewLeaveContent() {
    return (
        <div className="card shadow-sm modern-card">
            <div className="card-header gradient-header">
                <div className="d-flex align-items-center">
                    <div className="icon-wrapper me-3">
                        <i className="bi bi-eye"></i>
                    </div>
                    <h4 className="mb-0">View My Leave</h4>
                </div>
            </div>
            <div className="card-body p-4">
                <div className="alert alert-info d-flex align-items-center" role="alert">
                    <i className="bi bi-info-circle me-2"></i>
                    <div>This feature is under development. View your leave history in the Leave Planner section.</div>
                </div>
            </div>
        </div>
    );
}