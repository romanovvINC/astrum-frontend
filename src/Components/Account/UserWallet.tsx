import React, { FC } from "react";
import { ReactComponent as MoneyIcon } from "assets/svg/money-icon.svg";

interface IUserWalletProps {
    money: number;
}

const UserWallet: FC<IUserWalletProps> = ({ money }) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                backgroundColor: "#E3E3F3",
                borderRadius: 20,
                padding: "8px 10px",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MoneyIcon style={{ verticalAlign: "center" }} />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Press Start 2P', cursive", color: "#6362E7" }}>
                {money}
            </div>
        </div>
    );
};

export default UserWallet;
