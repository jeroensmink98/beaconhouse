# Beaconhouse

Run unlighthouse reports from a web based interface.

The backend will startup a docker container which will run the Google Lighthouse Tool to generate a report of your entire website.


## Entities

site:
- name: string
- url: string

testRun:


## Creating a new entity

1. Create entity in `typeorm` folder
2. Add entity to `index.ts` 
3. Create entity folder, add `services` and `controllers`, `module` and `dto`
4. Add each component to the entity, add API routes and implement logic in `service` 
5. When not created with the CLI add entity to `app.module`