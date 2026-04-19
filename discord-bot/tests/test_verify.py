import hashlib
import hmac

from src.utils.verify import verify_signature


def _make_sig(payload: str, secret: str) -> str:
    return "sha256=" + hmac.new(secret.encode(), payload.encode(), hashlib.sha256).hexdigest()


def test_valid_signature():
    assert verify_signature(b"hello", _make_sig("hello", "secret"), "secret")


def test_wrong_payload():
    assert not verify_signature(b"tampered", _make_sig("hello", "secret"), "secret")


def test_wrong_secret():
    assert not verify_signature(b"hello", _make_sig("hello", "wrong"), "secret")


def test_missing_signature():
    assert not verify_signature(b"hello", None, "secret")


def test_empty_signature():
    assert not verify_signature(b"hello", "", "secret")
