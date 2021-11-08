
exports.Network = Object.freeze({
    "Main":1, 
    "Rinkeby":4
});


var EventType;
(function (EventType) {
    // Transactions and signature requests
    EventType["TransactionCreated"] = "TransactionCreated";
    EventType["TransactionConfirmed"] = "TransactionConfirmed";
    EventType["TransactionDenied"] = "TransactionDenied";
    EventType["TransactionFailed"] = "TransactionFailed";
    // Pre-transaction events
    EventType["InitializeAccount"] = "InitializeAccount";
    EventType["WrapEth"] = "WrapEth";
    EventType["UnwrapWeth"] = "UnwrapWeth";
    EventType["ApproveCurrency"] = "ApproveCurrency";
    EventType["ApproveAsset"] = "ApproveAsset";
    EventType["ApproveAllAssets"] = "ApproveAllAssets";
    EventType["UnapproveCurrency"] = "UnapproveCurrency";
    // Basic actions: matching orders, creating orders, and cancelling orders
    EventType["MatchOrders"] = "MatchOrders";
    EventType["CancelOrder"] = "CancelOrder";
    EventType["ApproveOrder"] = "ApproveOrder";
    EventType["CreateOrder"] = "CreateOrder";
    // When the signature request for an order is denied
    EventType["OrderDenied"] = "OrderDenied";
    // When transferring one or more assets
    EventType["TransferAll"] = "TransferAll";
    EventType["TransferOne"] = "TransferOne";
    // Royalties
    EventType["UpdateRoyalties"] = "UpdateRoyalties";
    EventType["TransferRoyaltiesOwnership"] = "TransferRoyaltiesOwnership";
    // When wrapping or unwrapping NFTs
    EventType["WrapAssets"] = "WrapAssets";
    EventType["UnwrapAssets"] = "UnwrapAssets";
    EventType["LiquidateAssets"] = "LiquidateAssets";
    EventType["PurchaseAssets"] = "PurchaseAssets";
})(EventType = exports.EventType || (exports.EventType = {}));

const AssetType = function(assetClass, data) {
	return { assetClass, data }
}
exports.AssetType = AssetType;

exports.Asset = function(assetClass, assetData, value) {
	return { assetType: AssetType(assetClass, assetData), value };
}

exports.Order = function(maker, makeAsset, taker, takeAsset, salt, start, end, dataType, data) {
	return { maker, makeAsset, taker, takeAsset, salt, start, end, dataType, data };
}
