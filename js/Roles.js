/**
 * =========================================================
 * ROLES
 * =========================================================
 */

export const ROLES = {
    EXECUTIVE: "EXECUTIVE",
    QC_LEADER: "QC_LEADER",
    QG_OPERATOR: "QG_OPERATOR",
};

export const ROLE_LABELS = {
    [ROLES.EXECUTIVE]: "Executive",
    [ROLES.QC_LEADER]: "QC Leader",
    [ROLES.QG_OPERATOR]: "QG Operator",
};

export const ROUTE_MAP = {
    [ROLES.EXECUTIVE]: "QCExecutiveDashboard.html",
    [ROLES.QC_LEADER]: "QCLeaderDashboard.html",
    [ROLES.QG_OPERATOR]: "QGOperatorDashboard.html",
};

/**
 * =========================================================
 * TEMPORARY
 *
 * Compatibility function.
 * Login will be updated next to save role into session.
 * After every page has been migrated,
 * this function can be removed.
 * =========================================================
 */

export const detectUserRole = () => {

    try {

        const session = JSON.parse(
            localStorage.getItem("session")
        );

        return session?.role ?? null;

    } catch {

        return null;

    }

};

/**
 * =========================================================
 * ROLE MANAGER
 * =========================================================
 */

export const RoleManager = {

    /**
     * =====================================================
     * Validate Session
     * =====================================================
     */

    enforceStrictSession() {

        const sessionText =
            localStorage.getItem("session");

        if (!sessionText) {

            RoleManager.forceLogout();
            return;

        }

        try {

            const session = JSON.parse(sessionText);

            if (
                !session ||
                !session.employeeId ||
                !session.role
            ) {

                RoleManager.forceLogout();
                return;

            }

            if (
                !Object.values(ROLES).includes(session.role)
            ) {

                RoleManager.forceLogout();
                return;

            }

        } catch {

            RoleManager.forceLogout();

        }

    },

    /**
     * =====================================================
     * Protect Current Page
     * =====================================================
     */

    protectPage(...allowedRoles) {

        RoleManager.enforceStrictSession();

        const session = JSON.parse(
            localStorage.getItem("session")
        );

        if (
            allowedRoles.length &&
            !allowedRoles.includes(session.role)
        ) {

            console.warn("Unauthorized access.");

            RoleManager.redirectToRespectiveDashboard(
                session.role
            );

        }

    },

    /**
     * =====================================================
     * Redirect if already logged in
     * =====================================================
     */

    handleLoginRedirect() {

        const sessionText =
            localStorage.getItem("session");

        if (!sessionText)
            return;

        try {

            const session = JSON.parse(sessionText);

            if (
                session &&
                session.role
            ) {

                RoleManager.redirectToRespectiveDashboard(
                    session.role
                );

            }

        } catch {

            localStorage.removeItem("session");

        }

    },

    /**
     * =====================================================
     * Redirect
     * =====================================================
     */

    redirectToRespectiveDashboard(role) {

        const destination =
            ROUTE_MAP[role];

        if (!destination)
            return;

        if (
            !window.location.pathname.endsWith(destination)
        ) {

            window.location.replace(destination);

        }

    },

    /**
     * =====================================================
     * Logout
     * =====================================================
     */

    forceLogout() {

        localStorage.removeItem("session");

        localStorage.removeItem(
            "qc_logged_in_user"
        );

        sessionStorage.removeItem(
            "qc_logged_in_user"
        );

        window.location.replace(
            "Login.html"
        );

    }

};