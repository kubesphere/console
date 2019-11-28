image:
	yarn build
	docker build -t ks-console .

dev:
	make release-latest

release-%:
	docker tag ks-console kubespheredev/ks-console:$*
	docker push kubespheredev/ks-console:$*
