import { ApiError } from "./errors.js";
import jwt from "jsonwebtoken"
import {findPublic} from "./users.js"
// jsonwebtoken은 설치되어 있습니다. 아래 함수의 본문을 구현하세요.
export function issueToken(user) {
  const secret = process.env.JWT_SECRET;
  const ttl = Number(process.env.TOKEN_TTL || 90);

  if (!secret||!/^[0-9a-fA-F]{64}$/.test(secret)){
    throw new Error("JWT_SECRET 설정 오류");
  }
  if (!Number.isSafeInteger(ttl)||ttl<=0){
    throw new Error("TOKEN_TTL 설정 오류");
  }
  return jwt.sign(
    {sub:String(user.id)},Buffer.from(secret,"hex"),{
      algorithm: "HS256",
      expiresIn: ttl,
      issuer: process.env.JWT_ISSUER,
      audience: process.env.JWT_AUDIENCE
    }
  );
}
export function currentUserId(req) {
  const authorization = req.headers.authorization;

  if (!authorization || !/^Bearer \S+$/.test(authorization)) {
    throw new ApiError(401, "TOKEN_REQUIRED", "토큰이 필요합니다.");
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      Buffer.from(process.env.JWT_SECRET, "hex"),
      {
        algorithms: ["HS256"],
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE
      }
    );

    if (
      !Number.isSafeInteger(decoded.exp) ||
      typeof decoded.sub !== "string" ||
      !/^[1-9]\d*$/.test(decoded.sub)
    ) {
      throw new ApiError(401, "INVALID_TOKEN", "유효하지 않은 토큰입니다.");
    }

    const userId = Number(decoded.sub);

    if (!Number.isSafeInteger(userId) || !findPublic(userId)) {
      throw new ApiError(401, "INVALID_TOKEN", "사용자를 찾을 수 없습니다.");
    }

    return userId;

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "TOKEN_EXPIRED", "토큰이 만료되었습니다.");
    }

    throw new ApiError(401, "INVALID_TOKEN", "유효하지 않은 토큰입니다.");
  }
}

  // TODO BE-02: Bearer 추출 → 서명/알고리즘/만료/클레임 검증 → 실제 사용자 확인.
  // 완성 후 아래 데모 ID 반환을 제거하세요. 토큰 없음/변조/만료는 401입니다.

export function assertOwner(userId, authorId) {
  if(userId!==authorId){
    throw new ApiError(403,"FORBIDDEN","작성자만 수정하거나 삭제할 수 있습니다.");
  }
  // TODO BE-03: 다른 작성자이면 403 FORBIDDEN. 현재는 검사하지 않습니다.
}
