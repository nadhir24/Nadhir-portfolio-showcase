import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { eventBus } from "@/lib/eventBus";

interface SceneManagerProps {
    locationKey: string;
}

const SceneManager = ({ locationKey }: SceneManagerProps) => {
    const meshesGroup = useRef<THREE.Group>(null);
    const newPagePopMesh = useRef<THREE.Mesh>(null);

    useEffect(() => {
        const onOutro = ({ type }: { type: string }) => {
            if (type === "fold" && meshesGroup.current) {
                // Reset current page fold meshes
                gsap.set(meshesGroup.current.scale, { x: 1, y: 1, z: 1 });
                gsap.set(meshesGroup.current.rotation, { y: 0 });

                const tl = gsap.timeline();

                // Example: Fold a plane in half like a door closing
                tl.to(meshesGroup.current.rotation, {
                    y: Math.PI / 2, // Close inward
                    duration: 0.8,
                    ease: "power4.inOut",
                });
                tl.to(
                    meshesGroup.current.scale,
                    {
                        x: 0,
                        y: 0,
                        z: 0, // Disappear into background
                        duration: 0.5,
                        ease: "back.in(1.7)",
                    },
                    "-=0.3"
                );
            }
        };

        const onIntro = ({ type }: { type: string }) => {
            if (type === "fade" && newPagePopMesh.current) {
                const tl = gsap.timeline();

                // Pop the new page mesh from the center
                gsap.set(newPagePopMesh.current.scale, { x: 0, y: 0, z: 0 }); // Start small

                tl.to(newPagePopMesh.current.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.5)",
                    delay: 0.1, // Wait slightly for the previous fold to drop away
                });

                // Hide the mesh after animation so it doesn't block DOM
                tl.to(newPagePopMesh.current.scale, {
                    x: 0, y: 0, z: 0, duration: 0.5, ease: "power2.inOut", delay: 0.5
                });
            }
        };

        eventBus.on("PAGE_TRANSITION_OUT", onOutro);
        eventBus.on("PAGE_TRANSITION_IN", onIntro);

        return () => {
            eventBus.off("PAGE_TRANSITION_OUT", onOutro);
            eventBus.off("PAGE_TRANSITION_IN", onIntro);
        };
    }, []);

    return (
        <group>
            {/* Previous Page "Folding" Meshes */}
            <group ref={meshesGroup}>
                <mesh position={[-2, 0, 0]}>
                    <planeGeometry args={[4, 6]} />
                    <meshBasicMaterial color="#111111" side={THREE.DoubleSide} />
                </mesh>
                <mesh position={[2, 0, 0]}>
                    <planeGeometry args={[4, 6]} />
                    <meshBasicMaterial color="#111111" side={THREE.DoubleSide} />
                </mesh>
            </group>

            {/* New Page "Popping" Center Mesh */}
            <mesh ref={newPagePopMesh} position={[0, 0, 0]} scale={0}>
                <sphereGeometry args={[2, 64, 64]} />
                <meshNormalMaterial wireframe />
            </mesh>
        </group>
    );
};

export default SceneManager;
