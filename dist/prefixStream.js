"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var stream_1 = require("stream");
var deferred_1 = require("./deferred");
var PrefixStream = /** @class */ (function (_super) {
    __extends(PrefixStream, _super);
    // endregion
    function PrefixStream(prefix) {
        var _this = _super.call(this) || this;
        _this._prefixBuf = Buffer.from("[" + prefix + "] ");
        _this._flushedDeferred = new deferred_1.Deferred();
        return _this;
    }
    PrefixStream.prototype._transform = function (chunk, encoding, done) {
        // Convert to a Buffer.
        var chunkBuf = typeof chunk === "string" ? Buffer.from(chunk) : chunk;
        this._partial = this._partial && this._partial.length ?
            Buffer.concat([this._partial, chunkBuf]) :
            chunkBuf;
        // While complete lines exist, push them.
        var index = this._partial.indexOf("\n");
        while (index !== -1) {
            var line = this._partial.slice(0, ++index);
            this._partial = this._partial.slice(index);
            this.push(Buffer.concat([this._prefixBuf, line]));
            index = this._partial.indexOf("\n");
        }
        done();
    };
    PrefixStream.prototype._flush = function (done) {
        if (this._partial && this._partial.length) {
            this.push(Buffer.concat([this._prefixBuf, this._partial]));
        }
        this._flushedDeferred.resolve(undefined);
        done();
    };
    Object.defineProperty(PrefixStream.prototype, "prefix", {
        get: function () {
            return this._prefixBuf.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PrefixStream.prototype, "flushedPromise", {
        get: function () {
            return this._flushedDeferred.promise;
        },
        enumerable: true,
        configurable: true
    });
    return PrefixStream;
}(stream_1.Transform));
exports.PrefixStream = PrefixStream;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wcmVmaXhTdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQWlDO0FBQ2pDLHVDQUFvQztBQUdwQztJQUFrQyxnQ0FBUztJQU12QyxZQUFZO0lBR1osc0JBQVksTUFBYztRQUExQixZQUVJLGlCQUFPLFNBR1Y7UUFGRyxLQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBSSxNQUFNLE9BQUksQ0FBQyxDQUFDO1FBQzlDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLG1CQUFRLEVBQVEsQ0FBQzs7SUFDakQsQ0FBQztJQUdNLGlDQUFVLEdBQWpCLFVBQWtCLEtBQXNCLEVBQUUsUUFBZ0IsRUFBRSxJQUFlO1FBRXZFLHVCQUF1QjtRQUN2QixJQUFNLFFBQVEsR0FBVyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUVoRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsUUFBUSxDQUFDO1FBRWIseUNBQXlDO1FBQ3pDLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELE9BQU8sS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ2pCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEQsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDO0lBR00sNkJBQU0sR0FBYixVQUFjLElBQWU7UUFFekIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUN6QztZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5RDtRQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFekMsSUFBSSxFQUFFLENBQUM7SUFDWCxDQUFDO0lBR0Qsc0JBQVcsZ0NBQU07YUFBakI7WUFFSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyx3Q0FBYzthQUF6QjtZQUVJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQztRQUN6QyxDQUFDOzs7T0FBQTtJQUNMLG1CQUFDO0FBQUQsQ0E3REEsQUE2REMsQ0E3RGlDLGtCQUFTLEdBNkQxQztBQTdEWSxvQ0FBWSIsImZpbGUiOiJwcmVmaXhTdHJlYW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1RyYW5zZm9ybX0gZnJvbSBcInN0cmVhbVwiO1xuaW1wb3J0IHtEZWZlcnJlZH0gZnJvbSBcIi4vZGVmZXJyZWRcIjtcblxuXG5leHBvcnQgY2xhc3MgUHJlZml4U3RyZWFtIGV4dGVuZHMgVHJhbnNmb3JtXG57XG4gICAgLy8gcmVnaW9uIFByaXZhdGUgTWVtYmVyc1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX3ByZWZpeEJ1ZjogQnVmZmVyO1xuICAgIHByaXZhdGUgX3BhcnRpYWw6IEJ1ZmZlciB8IHVuZGVmaW5lZDtcbiAgICBwcml2YXRlIF9mbHVzaGVkRGVmZXJyZWQ6IERlZmVycmVkPHZvaWQ+O1xuICAgIC8vIGVuZHJlZ2lvblxuXG5cbiAgICBjb25zdHJ1Y3RvcihwcmVmaXg6IHN0cmluZylcbiAgICB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3ByZWZpeEJ1ZiA9IEJ1ZmZlci5mcm9tKGBbJHtwcmVmaXh9XSBgKTtcbiAgICAgICAgdGhpcy5fZmx1c2hlZERlZmVycmVkID0gbmV3IERlZmVycmVkPHZvaWQ+KCk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgX3RyYW5zZm9ybShjaHVuazogQnVmZmVyIHwgc3RyaW5nLCBlbmNvZGluZzogc3RyaW5nLCBkb25lOiAoKSA9PiBhbnkpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBDb252ZXJ0IHRvIGEgQnVmZmVyLlxuICAgICAgICBjb25zdCBjaHVua0J1ZjogQnVmZmVyID0gdHlwZW9mIGNodW5rID09PSBcInN0cmluZ1wiID8gQnVmZmVyLmZyb20oY2h1bmspIDogY2h1bms7XG5cbiAgICAgICAgdGhpcy5fcGFydGlhbCA9IHRoaXMuX3BhcnRpYWwgJiYgdGhpcy5fcGFydGlhbC5sZW5ndGggP1xuICAgICAgICAgICAgQnVmZmVyLmNvbmNhdChbdGhpcy5fcGFydGlhbCwgY2h1bmtCdWZdKSA6XG4gICAgICAgICAgICBjaHVua0J1ZjtcblxuICAgICAgICAvLyBXaGlsZSBjb21wbGV0ZSBsaW5lcyBleGlzdCwgcHVzaCB0aGVtLlxuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IHRoaXMuX3BhcnRpYWwuaW5kZXhPZihcIlxcblwiKTtcbiAgICAgICAgd2hpbGUgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgbGluZSA9IHRoaXMuX3BhcnRpYWwuc2xpY2UoMCwgKytpbmRleCk7XG4gICAgICAgICAgICB0aGlzLl9wYXJ0aWFsID0gdGhpcy5fcGFydGlhbC5zbGljZShpbmRleCk7XG4gICAgICAgICAgICB0aGlzLnB1c2goQnVmZmVyLmNvbmNhdChbdGhpcy5fcHJlZml4QnVmLCBsaW5lXSkpO1xuXG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuX3BhcnRpYWwuaW5kZXhPZihcIlxcblwiKTtcbiAgICAgICAgfVxuICAgICAgICBkb25lKCk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgX2ZsdXNoKGRvbmU6ICgpID0+IGFueSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLl9wYXJ0aWFsICYmIHRoaXMuX3BhcnRpYWwubGVuZ3RoKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnB1c2goQnVmZmVyLmNvbmNhdChbdGhpcy5fcHJlZml4QnVmLCB0aGlzLl9wYXJ0aWFsXSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2ZsdXNoZWREZWZlcnJlZC5yZXNvbHZlKHVuZGVmaW5lZCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgIH1cblxuXG4gICAgcHVibGljIGdldCBwcmVmaXgoKTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fcHJlZml4QnVmLnRvU3RyaW5nKCk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgZ2V0IGZsdXNoZWRQcm9taXNlKCk6IFByb21pc2U8dm9pZD5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mbHVzaGVkRGVmZXJyZWQucHJvbWlzZTtcbiAgICB9XG59XG4iXX0=
