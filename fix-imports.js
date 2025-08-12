import fs from "fs";
import path from "path";

const distDir = path.resolve("./dist");

// Regex tìm các import hoặc export thiếu đuôi .js, ví dụ:
// import ... from "./config/database"
// export ... from "./config/database"
const importExportRegex = /(import|export)([\s\S]*?)from\s+['"]([^'"]+?)['"]/g;

// Hàm kiểm tra có phải là đường dẫn import nội bộ không
function isLocalImport(p) {
  return p.startsWith("./") || p.startsWith("../");
}

// Duyệt file .js và sửa
function fixFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let updated = content.replace(
    importExportRegex,
    (match, type, middle, fromPath) => {
      // Nếu là local import mà chưa có .js hoặc .json hoặc .mjs đuôi thì thêm .js
      if (
        isLocalImport(fromPath) &&
        !fromPath.endsWith(".js") &&
        !fromPath.endsWith(".json") &&
        !fromPath.endsWith(".mjs")
      ) {
        return `${type}${middle}from '${fromPath}.js'`;
      }
      return match;
    }
  );
  if (content !== updated) {
    fs.writeFileSync(filePath, updated, "utf8");
    console.log(`Fixed imports in ${filePath}`);
  }
}

// Đệ quy duyệt tất cả file trong thư mục dist
function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith(".js")) {
      fixFile(fullPath);
    }
  }
}

walk(distDir);
console.log("Fix imports completed.");
