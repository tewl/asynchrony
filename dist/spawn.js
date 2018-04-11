"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var BBPromise = require("bluebird");
var collectorStream_1 = require("./collectorStream");
var cp = require("child_process");
var nullStream_1 = require("./nullStream");
var promiseHelpers_1 = require("./promiseHelpers");
/**
 * Spawns a child process.  Each stdout and stderr output line is prefixed with
 * the specified label.
 * @param description - A textual description of the command that is output when
 *     the child process starts
 * @param cmd - The command to run
 * @param args - An array of arguments for cmd
 * @param cwd - The current working directory for the child process
 * @param stdoutStream - The stream to receive stdout.  A NullStream if
 *     undefined.
 *     For example:
 *     `new CombinedStream(new PrefixStream("foo"), process.stdout)`
 * @param stderrStream - The stream to receive stderr  A NullStream if
 *     undefined. For example:
 *     `new CombinedStream(new PrefixStream(".    "), process.stderr)`
 * @return {Promise<string>} A Promise that is resolved when the child process's
 *     trimmed output when the exit code is 0 and is rejected when it is
 *     non-zero.
 */
function spawn(cmd, args, cwd, description, stdoutStream, stderrStream) {
    var cmdLineRepresentation = getCommandLineRepresentation(cmd, args);
    if (description) {
        console.log("--------------------------------------------------------------------------------");
        console.log("" + description);
        console.log("    " + cmdLineRepresentation);
        console.log("--------------------------------------------------------------------------------");
    }
    var stdoutCollector = new collectorStream_1.CollectorStream();
    var stderrCollector = new collectorStream_1.CollectorStream();
    return new BBPromise(function (resolve, reject) {
        var childProcess = cp.spawn(cmd, args, { cwd: cwd, stdio: [process.stdin, "pipe", "pipe"] });
        var outputStream = stdoutStream || new nullStream_1.NullStream();
        childProcess.stdout
            .pipe(stdoutCollector)
            .pipe(outputStream);
        var errorStream = stderrStream || new nullStream_1.NullStream();
        childProcess.stderr
            .pipe(stderrCollector) // to capture stderr in case child process errors
            .pipe(errorStream);
        childProcess.once("exit", function (exitCode) {
            // Wait for all steams to flush before reporting that the child
            // process has finished.
            promiseHelpers_1.eventToPromise(childProcess, "close")
                .then(function () {
                if (exitCode === 0) {
                    if (description) {
                        console.log("Child process succeeded: " + cmdLineRepresentation);
                    }
                    resolve(_.trim(stdoutCollector.collected));
                }
                else {
                    if (description) {
                        console.log("Child process failed: " + cmdLineRepresentation);
                    }
                    reject({ exitCode: exitCode, stderr: stderrCollector.collected });
                }
            });
        });
    });
}
exports.spawn = spawn;
function getCommandLineRepresentation(cmd, args) {
    args = args.map(function (curArg) {
        if (_.includes(curArg, " ")) {
            return "\"" + curArg + "\"";
        }
        else {
            return curArg;
        }
    });
    return cmd + " " + args.join(" ");
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,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eEI7YUFDRDtZQUNJLE9BQU8sTUFBTSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFVLEdBQUcsU0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBRyxDQUFDO0FBQ3RDLENBQUMiLCJmaWxlIjoic3Bhd24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCAqIGFzIEJCUHJvbWlzZSBmcm9tIFwiYmx1ZWJpcmRcIjtcbmltcG9ydCB7Q29sbGVjdG9yU3RyZWFtfSBmcm9tIFwiLi9jb2xsZWN0b3JTdHJlYW1cIjtcbmltcG9ydCAqIGFzIGNwIGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5pbXBvcnQge1dyaXRhYmxlfSBmcm9tIFwic3RyZWFtXCI7XG5pbXBvcnQge051bGxTdHJlYW19IGZyb20gXCIuL251bGxTdHJlYW1cIjtcbmltcG9ydCB7ZXZlbnRUb1Byb21pc2V9IGZyb20gXCIuL3Byb21pc2VIZWxwZXJzXCI7XG5cblxuLyoqXG4gKiBTcGF3bnMgYSBjaGlsZCBwcm9jZXNzLiAgRWFjaCBzdGRvdXQgYW5kIHN0ZGVyciBvdXRwdXQgbGluZSBpcyBwcmVmaXhlZCB3aXRoXG4gKiB0aGUgc3BlY2lmaWVkIGxhYmVsLlxuICogQHBhcmFtIGRlc2NyaXB0aW9uIC0gQSB0ZXh0dWFsIGRlc2NyaXB0aW9uIG9mIHRoZSBjb21tYW5kIHRoYXQgaXMgb3V0cHV0IHdoZW5cbiAqICAgICB0aGUgY2hpbGQgcHJvY2VzcyBzdGFydHNcbiAqIEBwYXJhbSBjbWQgLSBUaGUgY29tbWFuZCB0byBydW5cbiAqIEBwYXJhbSBhcmdzIC0gQW4gYXJyYXkgb2YgYXJndW1lbnRzIGZvciBjbWRcbiAqIEBwYXJhbSBjd2QgLSBUaGUgY3VycmVudCB3b3JraW5nIGRpcmVjdG9yeSBmb3IgdGhlIGNoaWxkIHByb2Nlc3NcbiAqIEBwYXJhbSBzdGRvdXRTdHJlYW0gLSBUaGUgc3RyZWFtIHRvIHJlY2VpdmUgc3Rkb3V0LiAgQSBOdWxsU3RyZWFtIGlmXG4gKiAgICAgdW5kZWZpbmVkLlxuICogICAgIEZvciBleGFtcGxlOlxuICogICAgIGBuZXcgQ29tYmluZWRTdHJlYW0obmV3IFByZWZpeFN0cmVhbShcImZvb1wiKSwgcHJvY2Vzcy5zdGRvdXQpYFxuICogQHBhcmFtIHN0ZGVyclN0cmVhbSAtIFRoZSBzdHJlYW0gdG8gcmVjZWl2ZSBzdGRlcnIgIEEgTnVsbFN0cmVhbSBpZlxuICogICAgIHVuZGVmaW5lZC4gRm9yIGV4YW1wbGU6XG4gKiAgICAgYG5ldyBDb21iaW5lZFN0cmVhbShuZXcgUHJlZml4U3RyZWFtKFwiLiAgICBcIiksIHByb2Nlc3Muc3RkZXJyKWBcbiAqIEByZXR1cm4ge1Byb21pc2U8c3RyaW5nPn0gQSBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiB0aGUgY2hpbGQgcHJvY2VzcydzXG4gKiAgICAgdHJpbW1lZCBvdXRwdXQgd2hlbiB0aGUgZXhpdCBjb2RlIGlzIDAgYW5kIGlzIHJlamVjdGVkIHdoZW4gaXQgaXNcbiAqICAgICBub24temVyby5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwYXduKFxuICAgIGNtZDogc3RyaW5nLFxuICAgIGFyZ3M6IEFycmF5PHN0cmluZz4sXG4gICAgY3dkPzogc3RyaW5nLFxuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nLFxuICAgIHN0ZG91dFN0cmVhbT86IFdyaXRhYmxlLFxuICAgIHN0ZGVyclN0cmVhbT86IFdyaXRhYmxlXG4pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGNtZExpbmVSZXByZXNlbnRhdGlvbiA9IGdldENvbW1hbmRMaW5lUmVwcmVzZW50YXRpb24oY21kLCBhcmdzKTtcblxuICAgIGlmIChkZXNjcmlwdGlvbilcbiAgICB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGAke2Rlc2NyaXB0aW9ufWApO1xuICAgICAgICBjb25zb2xlLmxvZyhgICAgICR7Y21kTGluZVJlcHJlc2VudGF0aW9ufWApO1xuICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHN0ZG91dENvbGxlY3RvciA9IG5ldyBDb2xsZWN0b3JTdHJlYW0oKTtcbiAgICBjb25zdCBzdGRlcnJDb2xsZWN0b3IgPSBuZXcgQ29sbGVjdG9yU3RyZWFtKCk7XG5cblxuICAgIHJldHVybiBuZXcgQkJQcm9taXNlKChyZXNvbHZlOiAob3V0cHV0OiBzdHJpbmcpID0+IHZvaWQsIHJlamVjdDogKGVycjoge2V4aXRDb2RlOiBudW1iZXIsIHN0ZGVycjogc3RyaW5nfSkgPT4gdm9pZCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGNoaWxkUHJvY2VzcyA9IGNwLnNwYXduKGNtZCwgYXJncywge2N3ZDogY3dkLCBzdGRpbzogW3Byb2Nlc3Muc3RkaW4sIFwicGlwZVwiLCBcInBpcGVcIl19KTtcblxuICAgICAgICBjb25zdCBvdXRwdXRTdHJlYW0gPSBzdGRvdXRTdHJlYW0gfHwgbmV3IE51bGxTdHJlYW0oKTtcblxuICAgICAgICBjaGlsZFByb2Nlc3Muc3Rkb3V0XG4gICAgICAgIC5waXBlKHN0ZG91dENvbGxlY3RvcilcbiAgICAgICAgLnBpcGUob3V0cHV0U3RyZWFtKTtcblxuICAgICAgICBjb25zdCBlcnJvclN0cmVhbSA9IHN0ZGVyclN0cmVhbSB8fCBuZXcgTnVsbFN0cmVhbSgpO1xuXG4gICAgICAgIGNoaWxkUHJvY2Vzcy5zdGRlcnJcbiAgICAgICAgLnBpcGUoc3RkZXJyQ29sbGVjdG9yKSAgLy8gdG8gY2FwdHVyZSBzdGRlcnIgaW4gY2FzZSBjaGlsZCBwcm9jZXNzIGVycm9yc1xuICAgICAgICAucGlwZShlcnJvclN0cmVhbSk7XG5cbiAgICAgICAgY2hpbGRQcm9jZXNzLm9uY2UoXCJleGl0XCIsIChleGl0Q29kZTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAvLyBXYWl0IGZvciBhbGwgc3RlYW1zIHRvIGZsdXNoIGJlZm9yZSByZXBvcnRpbmcgdGhhdCB0aGUgY2hpbGRcbiAgICAgICAgICAgIC8vIHByb2Nlc3MgaGFzIGZpbmlzaGVkLlxuICAgICAgICAgICAgZXZlbnRUb1Byb21pc2UoY2hpbGRQcm9jZXNzLCBcImNsb3NlXCIpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV4aXRDb2RlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXNjcmlwdGlvbilcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYENoaWxkIHByb2Nlc3Mgc3VjY2VlZGVkOiAke2NtZExpbmVSZXByZXNlbnRhdGlvbn1gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKF8udHJpbShzdGRvdXRDb2xsZWN0b3IuY29sbGVjdGVkKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlc2NyaXB0aW9uKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgQ2hpbGQgcHJvY2VzcyBmYWlsZWQ6ICR7Y21kTGluZVJlcHJlc2VudGF0aW9ufWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh7ZXhpdENvZGU6IGV4aXRDb2RlLCBzdGRlcnI6IHN0ZGVyckNvbGxlY3Rvci5jb2xsZWN0ZWR9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn1cblxuXG5mdW5jdGlvbiBnZXRDb21tYW5kTGluZVJlcHJlc2VudGF0aW9uKGNtZDogc3RyaW5nLCBhcmdzOiBBcnJheTxzdHJpbmc+KTogc3RyaW5nXG57XG4gICAgYXJncyA9IGFyZ3MubWFwKChjdXJBcmcpID0+XG4gICAge1xuICAgICAgICBpZiAoXy5pbmNsdWRlcyhjdXJBcmcsIFwiIFwiKSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGBcIiR7Y3VyQXJnfVwiYDtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBjdXJBcmc7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBgJHtjbWR9ICR7YXJncy5qb2luKFwiIFwiKX1gO1xufVxuIl19
