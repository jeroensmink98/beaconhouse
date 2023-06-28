# Custom Docker Images

We can build custom docker images of Unlighthouse using the bash script `build-container.sh` in the root of the project.


Run container image

```bash
docker run -v reports:/unlighthouse-reports -d -e SITE=https://devopsfrontier.com unlighthouse:1.0
```
