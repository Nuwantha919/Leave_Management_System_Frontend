
export default function DashboardContent({ role }: { role: string | null }) {
    return (
        <div className="row">
            <div className="col-12">
            
            {/* Role-based Welcome Message */}
            {role === 'ADMIN' ? (
                <div className="alert alert-info" role="alert">
                <i className="bi bi-tools me-2"></i>
                **Admin View:** You can manage all leave requests. Use the sidebar to navigate.
                </div>
            ) : (
                <div className="alert alert-success" role="alert">
                <i className="bi bi-check-circle me-2"></i>
                **Employee View:** You can apply for and view your leave requests.
                </div>
            )}
            
            {/* Placeholder for Main Dashboard Widgets */}
            <div className="row mt-4">
                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm border-primary">
                        <div className="card-body">
                            <h5 className="card-title text-primary">Total Leave Balance</h5>
                            <p className="card-text fs-2 fw-bold">15 Days</p>
                            <p className="text-muted small">Updated on {new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm border-warning">
                        <div className="card-body">
                            <h5 className="card-title text-warning">Pending Requests</h5>
                            <p className="card-text fs-2 fw-bold">3</p>
                            <p className="text-muted small">Action required by **{role === 'ADMIN' ? 'you' : 'Admin'}**.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm mt-4">
                <div className="card-body">
                <h5 className="card-title">Development Status</h5>
                <p className="card-text">
                    The core **Authentication Flow** is complete.
                </p>
                <p className="text-muted small">
                    *Next up: Implement the **Leave Module** functionality (Create, View, Edit) as outlined in the sidebar actions.*
                </p>
                </div>
            </div>

            </div>
        </div>
    );
}

