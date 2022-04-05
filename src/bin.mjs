#!/usr/bin/env node

// @ts-check

import { Builtins, Cli, Command, Option } from "clipanion";
import { execaCommand } from "execa";
import http from "node:http";
import { createRequire } from "node:module";
import { promisify } from "node:util";
import serveHandler from "serve-handler";

class ServeCommand extends Command {
  port = Option.String("-p,--port") ?? "8080";
  dir = Option.String("-d,--dir") ?? "public";
  command = Option.String({ name: "command", required: true });

  async execute() {
    const server = http.createServer((req, res) =>
      serveHandler(req, res, { public: this.dir })
    );

    await promisify(server.listen.bind(server))(this.port);

    try {
      await execaCommand(this.command, {
        shell: true,
        stdin: this.context.stdin,
        stdout: this.context.stdout,
        stderr: this.context.stderr,
      });
    } finally {
      await promisify(server.close.bind(server))();
    }
  }
}

const require = createRequire(import.meta.url);
const pkg = require("../package.json");

const cli = new Cli({
  binaryName: pkg.name,
  binaryVersion: pkg.version,
});

cli.register(ServeCommand);
cli.register(Builtins.VersionCommand);

cli.runExit(process.argv.slice(2));
